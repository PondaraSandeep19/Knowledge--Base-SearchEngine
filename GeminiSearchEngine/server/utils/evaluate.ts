import { cosineSimilarity } from "./embeddings";
import type { Chunk } from "../../shared/schema";

export function precisionAtK(
  queryEmbedding: number[],
  allChunks: Array<Chunk & { embedding: number[] }>,
  relevantDocumentIds: Set<string>,
  k: number
): { precision: number; retrieved: Array<{ id: string; documentId: string; similarity: number }> } {
  const similarities = allChunks.map(chunk => ({
    id: chunk.id,
    documentId: chunk.documentId,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  const ranked = similarities.sort((a, b) => b.similarity - a.similarity).slice(0, k);

  const relevantCount = ranked.reduce((acc, item) => acc + (relevantDocumentIds.has(item.documentId) ? 1 : 0), 0);

  return {
    precision: relevantCount / k,
    retrieved: ranked
  };
}
