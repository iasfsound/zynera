import express from "express";
import { generateBudget } from "../services/openaiBudgetService.js";

const router = express.Router();

interface BudgetRequest {
  answers: Array<{
    question: string;
    answer: string;
  }>;
}

router.post("/budget", async (req, res) => {
  try {
    const { answers }: BudgetRequest = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        error: "Invalid request",
        message: "Answers array is required"
      });
    }

    const budget = await generateBudget(answers);

    res.json({
      success: true,
      budget
    });
  } catch (error: any) {
    console.error("Error generating budget:", error);
    
    // Si hay cualquier error, devolver un presupuesto por defecto personalizado
    const defaultBudget = getDefaultBudget(answers);
    
    return res.status(200).json({
      success: true,
      budget: defaultBudget,
      note: "Presupuesto generado con información básica"
    });
  }
});

// Presupuesto por defecto si OpenAI falla
function getDefaultBudget(answers: Array<{ question: string; answer: string }>) {
  const answersText = answers.map(a => a.answer.toLowerCase()).join(" ");
  
  let estimatedBudget = "3.000€ - 8.000€";
  let timeline = "2-4 meses";
  
  // Personalizar según las respuestas
  if (answersText.includes("sistema completo") || answersText.includes("múltiples")) {
    estimatedBudget = "15.000€ - 35.000€";
    timeline = "4-6 meses";
  } else if (answersText.includes("más de 25.000€") || answersText.includes("gran empresa")) {
    estimatedBudget = "25.000€ - 50.000€";
    timeline = "6-12 meses";
  } else if (answersText.includes("menos de 1.000€") || answersText.includes("autónomo")) {
    estimatedBudget = "500€ - 2.000€";
    timeline = "1-2 meses";
  }
  
  return {
    title: "Presupuesto Orientativo para tu Proyecto",
    summary: "Basado en tus respuestas, hemos preparado un presupuesto orientativo para tu proyecto de automatización.",
    estimatedBudget,
    breakdown: [
      "Análisis y consultoría inicial",
      "Desarrollo e implementación",
      "Integraciones y configuraciones",
      "Formación y documentación",
      "Soporte post-implementación (3 meses)"
    ],
    timeline,
    nextSteps: [
      "Revisar el presupuesto detallado que recibirás por email",
      "Agendar una llamada para discutir los detalles",
      "Ajustar el alcance según tus necesidades específicas",
      "Definir el plan de implementación"
    ]
  };
}

export { router as budgetRouter };

