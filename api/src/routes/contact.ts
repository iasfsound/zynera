import express from "express";
import { sendContactNotification, sendContactConfirmation } from "../services/notificationEmailService.js";
import { saveContactToAirtable } from "../services/airtableService.js";

const router = express.Router();

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string; // "hero", "cta", "contact-modal", etc.
}

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, company, message, source }: ContactRequest = req.body;

    // Validación
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Invalid request",
        message: "Name, email, and message are required"
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
    const airtableSaved = await saveContactToAirtable({
      name,
      email,
      phone,
      company,
      message,
      source: source || "unknown",
    });

    // Enviar notificación al administrador (no bloquea si falla)
    const adminEmailSent = await sendContactNotification({
      name,
      email,
      phone,
      company,
      message,
      source: source || "unknown",
    });

    // Enviar confirmación al cliente (no bloquea si falla)
    const confirmationSent = await sendContactConfirmation({
      name,
      email,
      phone,
      company,
      message,
      source: source || "unknown",
    });

    res.json({
      success: true,
      message: "Formulario enviado correctamente",
      details: {
        airtable: airtableSaved,
        adminEmail: adminEmailSent,
        confirmationEmail: confirmationSent,
      },
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    
    res.status(500).json({
      error: "Internal server error",
      message: "Error al enviar el formulario. Por favor, intenta más tarde.",
    });
  }
});

export { router as contactRouter };

