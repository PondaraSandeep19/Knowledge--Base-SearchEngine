import { type Document, type InsertDocument, type Chunk, type InsertChunk } from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createDocument(doc: InsertDocument): Promise<Document>;
  getDocument(id: string): Promise<Document | undefined>;
  getAllDocuments(): Promise<Document[]>;
  deleteDocument(id: string): Promise<void>;
  
  createChunk(chunk: InsertChunk): Promise<Chunk>;
  getChunksByDocumentId(documentId: string): Promise<Chunk[]>;
  getAllChunks(): Promise<Chunk[]>;
  deleteChunksByDocumentId(documentId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private documents: Map<string, Document>;
  private chunks: Map<string, Chunk>;

  constructor() {
    this.documents = new Map();
    this.chunks = new Map();
  }

  async createDocument(insertDoc: InsertDocument): Promise<Document> {
    const id = randomUUID();
    const doc: Document = { 
      ...insertDoc, 
      id,
      uploadDate: new Date()
    };
    this.documents.set(id, doc);
    return doc;
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  async deleteDocument(id: string): Promise<void> {
    this.documents.delete(id);
    await this.deleteChunksByDocumentId(id);
  }

  async createChunk(insertChunk: InsertChunk): Promise<Chunk> {
    const id = randomUUID();
    const chunk: Chunk = { ...insertChunk, id };
    this.chunks.set(id, chunk);
    return chunk;
  }

  async getChunksByDocumentId(documentId: string): Promise<Chunk[]> {
    return Array.from(this.chunks.values()).filter(
      (chunk) => chunk.documentId === documentId
    );
  }

  async getAllChunks(): Promise<Chunk[]> {
    return Array.from(this.chunks.values());
  }

  async deleteChunksByDocumentId(documentId: string): Promise<void> {
    const chunksToDelete = Array.from(this.chunks.entries())
      .filter(([_, chunk]) => chunk.documentId === documentId)
      .map(([id]) => id);
    
    chunksToDelete.forEach(id => this.chunks.delete(id));
  }
}

export const storage = new MemStorage();
