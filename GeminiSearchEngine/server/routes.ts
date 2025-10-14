import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { extractTextFromPDF, extractTextFromTXT, chunkText } from "./utils/textExtractor";
import { generateEmbedding, findSimilarChunks } from "./utils/embeddings";
import { generateAnswer } from "./utils/gemini";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/documents", upload.array("files"), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const uploadedDocs = [];

      for (const file of files) {
        let text = "";
        
        if (file.mimetype === "application/pdf") {
          text = await extractTextFromPDF(file.buffer);
        } else if (file.mimetype === "text/plain") {
          text = extractTextFromTXT(file.buffer);
        } else {
          continue;
        }

        const document = await storage.createDocument({
          filename: file.originalname,
          content: text,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        });

        const chunks = chunkText(text);
        
        for (let i = 0; i < chunks.length; i++) {
          const embedding = await generateEmbedding(chunks[i]);
          await storage.createChunk({
            documentId: document.id,
            content: chunks[i],
            embedding,
            chunkIndex: i
          });
        }

        uploadedDocs.push(document);
      }

      res.json({ 
        success: true, 
        documents: uploadedDocs 
      });
    } catch (error) {
      console.error("Error uploading documents:", error);
      res.status(500).json({ error: "Failed to upload documents" });
    }
  });

  app.get("/api/documents", async (_req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.delete("/api/documents/:id", async (req, res) => {
    try {
      await storage.deleteDocument(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ error: "Failed to delete document" });
    }
  });

  app.post("/api/query", async (req, res) => {
    try {
      const { query } = req.body;

      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }

      const queryEmbedding = await generateEmbedding(query);
      const allChunks = await storage.getAllChunks();

      if (allChunks.length === 0) {
        return res.json({
          answer: "No documents have been uploaded yet. Please upload some documents first.",
          sources: []
        });
      }

      const similarChunks = await findSimilarChunks(queryEmbedding, allChunks, 3);
      
      const contexts = similarChunks.map(chunk => chunk.content);
      const answer = await generateAnswer(query, contexts);

      const sources = await Promise.all(
        similarChunks.map(async (chunk) => {
          const document = await storage.getDocument(chunk.documentId);
          return {
            documentName: document?.filename || "Unknown",
            excerpt: chunk.content.substring(0, 150) + "...",
            fullContext: chunk.content
          };
        })
      );

      res.json({ answer, sources });
    } catch (error) {
      console.error("Error processing query:", error);
      res.status(500).json({ error: "Failed to process query" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
