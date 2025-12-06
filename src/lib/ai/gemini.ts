import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export async function generateChatResponse(message: string, history: ChatMessage[] = []) {
  const chat = geminiModel.startChat({
    history: history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })),
  });

  const result = await chat.sendMessage(message);
  const response = result.response;

  return {
    text: response.text(),
    usage: response.usageMetadata,
  };
}

export async function generateContent(prompt: string) {
  const result = await geminiModel.generateContent(prompt);
  const response = result.response;

  return {
    text: response.text(),
    usage: response.usageMetadata,
  };
}
