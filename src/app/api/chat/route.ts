import { NextResponse } from 'next/server';
import { generateRAGAnswer } from '@/lib/ai/gemini';

export async function POST(req: Request) {
  try {
    const { question, contextChunks } = await req.json();

    if (!question || !contextChunks) {
      return NextResponse.json({ error: 'Question and context are required' }, { status: 400 });
    }

    const answer = await generateRAGAnswer(question, contextChunks);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: 'Failed to generate answer' }, { status: 500 });
  }
}
