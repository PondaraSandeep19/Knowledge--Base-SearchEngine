
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

/**
 * Generates a helpful answer to a user query using Gemini, based on provided document context.
 * @param query The user's question.
 * @param context Array of context strings from documents.
 * @returns Formatted answer string.
 */
export async function generateAnswer(query: string, context: string[]): Promise<string> {
  try {
    const prompt = buildPrompt(query, context);
    const rawAnswer = await getGeminiAnswer(prompt);
    return cleanAndFormatAnswer(rawAnswer, prompt);
  } catch (error) {
    console.error('Error generating answer:', error);
    throw new Error('Failed to generate answer');
  }
}

/**
 * Builds the prompt for Gemini based on the user query and document context.
 */
function buildPrompt(query: string, context: string[]): string {
  return `You are a helpful assistant that answers questions based on the provided document context.

Context from documents:
${context.map((ctx, i) => `[${i + 1}] ${ctx}`).join('\n\n')}

User Question: ${query}

Instructions:
- Answer the question using ONLY the information from the context above
- Be concise and accurate
- If the context doesn't contain enough information to answer the question, say so
- Cite which context section(s) you used by mentioning [1], [2], etc.

Answer:`;
}

/**
 * Calls Gemini API and returns the raw answer text.
 */
async function getGeminiAnswer(prompt: string): Promise<string> {
  const result = await genAI.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });
  const candidate = result.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No text in response');
  }
  return text;
}

/**
 * Formats the Gemini answer for clarity and readability.
 */
/**
 * Cleans model output to remove echoed prompts/instructions and returns plain-text formatted answer.
 */
function cleanAndFormatAnswer(answer: string, prompt?: string): string {
  let a = (answer || '').toString();

  // If the model echoed the prompt, remove that chunk
  if (prompt && a.includes(prompt)) {
    a = a.replace(prompt, '');
  }

  // If the model includes an explicit 'Answer:' or similar marker, take the text after it
  const markers = ['Answer:', 'Final Answer:', 'Response:'];
  for (const marker of markers) {
    const idx = a.indexOf(marker);
    if (idx !== -1) {
      a = a.slice(idx + marker.length);
      break;
    }
  }

  // Strip any HTML tags the formatter might have inserted previously
  a = a.replace(/<[^>]*>/g, '');

  // Normalize line endings and collapse excessive newlines
  a = a.replace(/\r/g, '');
  a = a.replace(/\n{3,}/g, '\n\n');

  // Trim whitespace
  a = a.trim();

  // Ensure citations remain as plain bracketed references like [1]
  a = a.replace(/\[\s*(\d+)\s*\]/g, '[$1]');

  return a;
}
