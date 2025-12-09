import express from "express";
import { saveLeadToAirtable } from "../services/airtableService.js";
import { sendDiagnosisEmail, sendBudgetEmail } from "../services/emailService.js";

const router = express.Router();

interface LeadRequest {
  name: string;
  email: string;
  phone?: string;
  diagnosis?: {
    title: string;
    summary: string;
    recommendations: string[];
    priority: string;
    estimatedImpact: string;
  } | null;
  budget?: {
    title: string;
    summary: string;
    estimatedBudget: string;
    breakdown: string[];
    timeline: string;
    nextSteps: string[];
  } | null;
  mode?: "flowfinder" | "presupuesto";
  answers: Array<{
    question: string;
    answer: string;
  }>;
}

router.post("/leads", async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, phone, diagnosis, budget, mode, answers }: LeadRequest = req.body;

    // Validación
    if (!name || !email || (!diagnosis && !budget)) {
      return res.status(400).json({
        error: "Invalid request",
        message: "Name, email, and either diagnosis or budget are required"
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email",
        message: "Please provide a valid email address"
      });
    }

    // Guardar en Airtable (no bloquea si falla)
    const airtableSaved = await saveLeadToAirtable({
      name,
      email,
      phone,
      diagnosis: diagnosis || null,
      budget: budget || null,
      mode: mode || "flowfinder",
      answers,
    });

    // Enviar email (no bloquea si falla)
    let emailSent = false;
    if (budget) {
      // Enviar email con presupuesto
      emailSent = await sendBudgetEmail({
        to: email,
        name,
        budget,
        answers,
      });
    } else if (diagnosis) {
      // Enviar email con diagnóstico
      emailSent = await sendDiagnosisEmail({
        to: email,
        name,
        diagnosis,
        answers,
      });
    }

    // Siempre devolvemos éxito aunque algunos servicios fallen
    // (para no frustrar al usuario)
    res.json({
      success: true,
      message: "Lead guardado y email enviado",
      details: {
        airtable: airtableSaved,
        email: emailSent,
      },
    });
  } catch (error: any) {
    console.error("Error processing lead:", error);
    
    res.status(500).json({
      error: "Internal server error",
      message: "Error al procesar tu solicitud. Por favor, intenta más tarde.",
    });
  }
});

export { router as leadsRouter };

