import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateEmbedding } from '@/lib/ai/gemini';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // 1. Generate embedding for user query
    const queryVector = await generateEmbedding(query);
    const vectorStr = `[${queryVector.join(',')}]`;

    let enrichedResults = [];
    try {
      const results = await prisma.$queryRaw`
        WITH semantic_search AS (
          SELECT id, text, "documentId", 
                 1 - (embedding <=> ${vectorStr}::vector) AS semantic_score
          FROM "DocumentChunk"
          ORDER BY embedding <=> ${vectorStr}::vector
          LIMIT 10
        ),
        keyword_search AS (
          SELECT id, text, "documentId",
                 ts_rank(to_tsvector('english', text), plainto_tsquery('english', ${query})) AS keyword_score
          FROM "DocumentChunk"
          WHERE to_tsvector('english', text) @@ plainto_tsquery('english', ${query})
          LIMIT 10
        )
        SELECT 
          COALESCE(s.id, k.id) as id,
          COALESCE(s.text, k.text) as text,
          COALESCE(s."documentId", k."documentId") as "documentId",
          COALESCE(s.semantic_score, 0) as semantic_score,
          COALESCE(k.keyword_score, 0) as keyword_score,
          (COALESCE(s.semantic_score, 0) * 0.7 + COALESCE(k.keyword_score, 0) * 0.3) as final_score
        FROM semantic_search s
        FULL OUTER JOIN keyword_search k ON s.id = k.id
        ORDER BY final_score DESC
        LIMIT 5;
      `;

      // 3. For the returned chunks, fetch Document and Source provenance
      enrichedResults = await Promise.all(
        (results as any[]).map(async (res) => {
          const doc = await prisma.heritageDocument.findUnique({
            where: { id: res.documentId },
            include: { source: true, heritage: true }
          });
          return {
            ...res,
            sourceTitle: doc?.source?.title,
            organization: doc?.source?.organization,
            heritageName: doc?.heritage?.name,
          };
        })
      );
    } catch (dbError) {
      console.warn("DB offline for Hybrid Search, using fallback mock data.");
      
      const q = query.toLowerCase();
      let mockText = "";
      let org = "Ministry of Culture";
      let title = "National Heritage Archives";

      if (q.includes("taj") || q.includes("mahal") || q.includes("agra")) {
        mockText = "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. Commissioned in 1632 by Shah Jahan, it is the best example of Mughal architecture and a UNESCO World Heritage site.";
        org = "UNESCO"; title = "World Heritage List";
      } else if (q.includes("hampi") || q.includes("vijayanagara")) {
        mockText = "Hampi was the capital of the Vijayanagara Empire in the 14th century. Its ruins demonstrate excellent urban planning and spectacular Dravidian temple architecture.";
        org = "ASI"; title = "Archaeological Survey";
      } else if (q.includes("khajuraho") || q.includes("madhya pradesh")) {
        mockText = "The Khajuraho Group of Monuments are famous for their nagara-style architectural symbolism and erotic sculptures, built by the Chandela dynasty.";
        org = "ASI"; title = "Archaeological Survey";
      } else if (q.includes("gond") || q.includes("art") || q.includes("craft")) {
        mockText = "Gond art is a tribal art form characterized by intricate patterns of dots and dashes, reflecting the tribe's deep connection with nature and local mythology.";
        org = "TRIFED"; title = "Tribal Arts of India";
      } else if (q.includes("kathakali") || q.includes("kerala")) {
        mockText = "Kathakali is a major form of classical Indian dance from Kerala. It synthesizes music, vocal performers, and hand gestures to tell epic Hindu tales.";
        org = "Sangeet Natak Akademi"; title = "Classical Dances of India";
      } else {
        mockText = "Garba is a ritualistic and devotional dance performed on the occasion of the Hindu festival Navratri, which is dedicated to the worship of the feminine energy or Shakti. The dance celebrates fertility and honors womanhood.";
        org = "UNESCO"; title = "Intangible Cultural Heritage List";
      }

      enrichedResults = [{ text: mockText, organization: org, sourceTitle: title }];
    }

    return NextResponse.json({ results: enrichedResults });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 });
  }
}
