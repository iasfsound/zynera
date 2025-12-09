// Individual serverless function for /api/contact
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendContactNotification, sendContactConfirmation } from './src/services/notificationEmailService.js';
import { saveContactToAirtable } from './src/services/airtableService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, message, source } = req.body;

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
      source,
    });

    // Enviar notificación al admin (no bloquea si falla)
    const notificationSent = await sendContactNotification({
      to: process.env.ADMIN_EMAIL || "guillermo@zynerapro.com",
      name,
      email,
      phone,
      company,
      message,
      source,
    });

    // Enviar confirmación al cliente (no bloquea si falla)
    const confirmationSent = await sendContactConfirmation({
      to: email,
      name,
    });

    // Siempre devolvemos éxito aunque algunos servicios fallen
    res.json({
      success: true,
      message: "Mensaje enviado correctamente",
      details: {
        airtable: airtableSaved,
        notification: notificationSent,
        confirmation: confirmationSent,
      },
    });
  } catch (error: any) {
    console.error("Error processing contact:", error);
    
    res.status(500).json({
      error: "Internal server error",
      message: "Error al procesar tu solicitud. Por favor, intenta más tarde.",
    });
  }
}

