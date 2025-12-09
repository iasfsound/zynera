import express from "express";
import { generateChatResponse } from "../services/openaiChatService.js";

const router = express.Router();

interface ChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

router.post("/chat", async (req, res) => {
  try {
    const { message, conversationHistory }: ChatRequest = req.body;

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
});

export { router as chatRouter };

