import { GoogleGenAI } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  console.warn("Missing GEMINI_API_KEY environment variable. Using dummy.");
}

// Initialize the client
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy",
});

/**
 * Generates vector embeddings for a given text using gemini-embedding model
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: text,
    });
    return response.embeddings?.[0]?.values || [];
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
}

/**
 * Generates an answer strictly based on provided context
 */
export async function generateRAGAnswer(question: string, contextChunks: { text: string; source: string }[]) {
  const contextStr = contextChunks
    .map((chunk) => `[Source: ${chunk.source}]\n${chunk.text}`)
    .join('\n\n');

  const prompt = `
You are Dharohar's AI Cultural Assistant. Your primary goal is to provide verified information about Indian Heritage.

First, check if the provided local verified context contains the answer:
Local Context:
${contextStr}

If the local context is sufficient, answer the question and cite the [Source: ...].
If the local context is empty or insufficient, use your Google Search tool to find the most accurate and up-to-date information about the user's question, and cite your sources.

Question: ${question}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating RAG answer:", error);
    throw new Error("Failed to generate answer");
  }
}
