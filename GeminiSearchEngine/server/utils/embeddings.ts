import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const result = await genAI.models.embedContent({
      model: "text-embedding-004",
      contents: [text]
    });
    
    if (!result.embeddings || result.embeddings.length === 0) {
      throw new Error('No embeddings returned');
    }
    
    const values = result.embeddings[0].values;
    if (!values) {
      throw new Error('No embedding values in response');
    }
    
    return values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function findSimilarChunks(
  queryEmbedding: number[],
  allChunks: Array<{ id: string; content: string; embedding: number[]; documentId: string }>,
  topK: number = 3
): Promise<Array<{ id: string; content: string; similarity: number; documentId: string }>> {
  const similarities = allChunks.map(chunk => ({
    id: chunk.id,
    content: chunk.content,
    documentId: chunk.documentId,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));
  
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}
