// Individual serverless function for /api/chat
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateChatResponse } from './src/services/openaiChatService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory } = req.body;

    // Validación
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: "Invalid request",
        message: "Message is required and must be a non-empty string"
      });
    }

    // Validar conversationHistory si existe
    if (conversationHistory && !Array.isArray(conversationHistory)) {
      return res.status(400).json({
        error: "Invalid request",
        message: "conversationHistory must be an array"
      });
    }

    // Generar respuesta del chat
    const response = await generateChatResponse(message, conversationHistory || []);

    res.json({
      success: true,
      response: response,
    });
  } catch (error: any) {
    console.error("Error processing chat message:", error);
    
    res.status(500).json({
      error: "Internal server error",
      message: "Error al procesar tu mensaje. Por favor, intenta más tarde.",
    });
  }
}

