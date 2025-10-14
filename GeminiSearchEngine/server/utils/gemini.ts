import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateAnswer(query: string, context: string[]): Promise<string> {
  try {
    const prompt = `You are a helpful assistant that answers questions based on the provided document context. 
    
Context from documents:
${context.map((ctx, i) => `[${i + 1}] ${ctx}`).join('\n\n')}

User Question: ${query}

Instructions:
- Answer the question using ONLY the information from the context above
- Be concise and accurate
- If the context doesn't contain enough information to answer the question, say so
- Cite which context section(s) you used by mentioning [1], [2], etc.

Answer:`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt
    });
    
    if (!result.text) {
      throw new Error('No text in response');
    }
    
    return result.text;
  } catch (error) {
    console.error('Error generating answer:', error);
    throw new Error('Failed to generate answer');
  }
}
