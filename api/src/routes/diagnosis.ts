import express from "express";
import { generateDiagnosis } from "../services/openaiService.js";

const router = express.Router();

interface DiagnosisRequest {
  answers: Array<{
    question: string;
    answer: string;
  }>;
}

router.post("/diagnosis", async (req, res) => {
  const { answers }: DiagnosisRequest = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({
      error: "Invalid request",
      message: "Answers array is required"
    });
  }

  try {
    const diagnosis = await generateDiagnosis(answers);

    res.json({
      success: true,
      diagnosis
    });
  } catch (error: any) {
    console.error("Error generating diagnosis:", error);
    
    // Si hay cualquier error, devolver un diagnóstico por defecto personalizado
    // basado en las respuestas del usuario
    const defaultDiagnosis = getDefaultDiagnosis(answers);
    
    return res.status(200).json({
      success: true,
      diagnosis: defaultDiagnosis,
      note: "Diagnóstico generado con información básica"
    });
  }
});

// Diagnóstico por defecto si OpenAI falla
function getDefaultDiagnosis(answers: Array<{ question: string; answer: string }>) {
  // Analizar las respuestas para personalizar el diagnóstico
  const answersText = answers.map(a => a.answer.toLowerCase()).join(" ");
  
  let title = "Oportunidades de Automatización Identificadas";
  let priority: "high" | "medium" | "low" = "medium";
  let estimatedImpact = "Medio - Ahorro de 10-20 horas semanales";
  
  // Personalizar según las respuestas
  if (answersText.includes("más de 30 horas") || answersText.includes("más de 30")) {
    priority = "high";
    estimatedImpact = "Alto - Ahorro de 30-50 horas semanales";
    title = "Alta Prioridad: Automatización Urgente";
  } else if (answersText.includes("15-30 horas")) {
    priority = "high";
    estimatedImpact = "Alto - Ahorro de 20-35 horas semanales";
  }
  
  if (answersText.includes("chatbot") || answersText.includes("atención al cliente")) {
    title = "Automatización de Atención al Cliente";
  } else if (answersText.includes("proceso") || answersText.includes("repetitivo")) {
    title = "Automatización de Procesos Repetitivos";
  }
  
  return {
    title,
    summary: "Basado en tus respuestas, hemos identificado varias áreas donde la automatización puede mejorar significativamente la eficiencia de tu negocio. Nuestro equipo puede ayudarte a implementar soluciones personalizadas.",
    recommendations: [
      "Implementar chatbots inteligentes para atención al cliente 24/7",
      "Automatizar procesos repetitivos con RPA (Robotic Process Automation)",
      "Utilizar IA para análisis de datos y generación de reportes automáticos",
      "Integrar sistemas para mejorar la comunicación interna",
      "Crear flujos de trabajo automatizados para tareas rutinarias"
    ],
    priority,
    estimatedImpact
  };
}

export { router as diagnosisRouter };

