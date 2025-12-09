import nodemailer from "nodemailer";
import { Resend } from "resend";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string; // "hero", "cta", "contact-modal", etc.
}

// Inicializar Resend de forma lazy (cuando se necesita)
let resend: Resend | null = null;

function initializeResend() {
  if (resend) return resend; // Ya inicializado
  
  if (process.env.RESEND_API_KEY) {
    try {
      resend = new Resend(process.env.RESEND_API_KEY);
      console.log("✅ Resend inicializado correctamente");
      return resend;
    } catch (error) {
      console.warn("Error inicializando Resend:", error);
      return null;
    }
  } else {
    console.warn("⚠️  Resend no configurado. RESEND_API_KEY es requerida.");
    return null;
  }
}

// Reutilizar el transporter del emailService (fallback)
function createTransporter() {
  // Si hay configuración de SMTP personalizada, usarla
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Si hay configuración de Gmail OAuth2
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });
  }

  return null;
}

function generateNotificationHTML(data: ContactFormData): string {
  const sourceLabels: Record<string, string> = {
    hero: "Formulario Hero (Inicio)",
    cta: "Formulario CTA (Call to Action)",
    "contact-modal": "Modal de Contacto",
    flowfinder: "Flow Finder",
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Contacto - Zynera</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F6F8FA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F6F8FA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00E4FF, #147BFF); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: bold;">Nuevo Contacto</h1>
              <p style="margin: 10px 0 0 0; color: #FFFFFF; opacity: 0.9; font-size: 16px;">Zynera Website</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Has recibido un nuevo mensaje de contacto desde tu sitio web.
              </p>
              
              ${data.source ? `
              <div style="background-color: #F9FAFB; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #00E4FF;">
                <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Origen</p>
                <p style="margin: 4px 0 0 0; color: #111827; font-size: 16px; font-weight: 600;">${sourceLabels[data.source] || data.source}</p>
              </div>
              ` : ''}
              
              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #F9FAFB; border-radius: 8px; border: 1px solid #E4E7EB;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #E4E7EB;">
                          <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre</p>
                          <p style="margin: 4px 0 0 0; color: #111827; font-size: 16px; font-weight: 600;">${data.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #E4E7EB;">
                          <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                          <p style="margin: 4px 0 0 0; color: #111827; font-size: 16px;">
                            <a href="mailto:${data.email}" style="color: #00E4FF; text-decoration: none;">${data.email}</a>
                          </p>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #E4E7EB;">
                          <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Teléfono</p>
                          <p style="margin: 4px 0 0 0; color: #111827; font-size: 16px;">
                            <a href="tel:${data.phone}" style="color: #00E4FF; text-decoration: none;">${data.phone}</a>
                          </p>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.company ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Empresa</p>
                          <p style="margin: 4px 0 0 0; color: #111827; font-size: 16px; font-weight: 600;">${data.company}</p>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; border: 1px solid #E4E7EB;">
                <p style="margin: 0 0 12px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</p>
                <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              
              <!-- CTA -->
              <div style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 2px solid #E4E7EB;">
                <a href="mailto:${data.email}?subject=Re: Tu consulta en Zynera" 
                   style="display: inline-block; background: linear-gradient(135deg, #00E4FF, #147BFF); color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Responder por Email
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E4E7EB;">
              <p style="margin: 0; color: #6B7280; font-size: 14px;">
                <strong>Zynera</strong> - Automatización e Inteligencia Artificial
              </p>
              <p style="margin: 10px 0 0 0; color: #9CA3AF; font-size: 12px;">
                Este email fue generado automáticamente desde el formulario de contacto.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendContactNotification(data: ContactFormData): Promise<boolean> {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || "guillermo@zynerapro.com";
  
  if (!recipientEmail) {
    console.warn("⚠️  NOTIFICATION_EMAIL no configurado. No se puede enviar notificación.");
    return false;
  }

  const fromEmail = process.env.EMAIL_FROM || "guillermo@zynerapro.com";
  const fromName = process.env.EMAIL_FROM_NAME || "Zynera";

  // Inicializar Resend de forma lazy
  const resendInstance = initializeResend();
  
  // Usar Resend si está configurado (preferido)
  if (resendInstance) {
    try {
      await resendInstance.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: recipientEmail,
        reply_to: data.email, // Para que puedas responder directamente
        subject: `Nuevo contacto: ${data.name}${data.company ? ` - ${data.company}` : ''}`,
        html: generateNotificationHTML(data),
        text: `
Nuevo contacto desde Zynera

${data.source ? `Origen: ${data.source}\n` : ''}
Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}\n` : ''}
${data.company ? `Empresa: ${data.company}\n` : ''}

Mensaje:
${data.message}

---
Puedes responder directamente a este email para contactar con ${data.name}.
        `.trim(),
      });

      console.log("✅ Notificación de contacto enviada con Resend a:", recipientEmail);
      return true;
    } catch (error: any) {
      console.error("❌ Error enviando notificación con Resend:", error);
      return false;
    }
  }

  // Fallback a nodemailer si Resend no está configurado
  const transporter = createTransporter();
  
  if (!transporter) {
    console.warn("⚠️  Email no configurado. Configura RESEND_API_KEY o SMTP para recibir notificaciones.");
    return false;
  }

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: recipientEmail,
      replyTo: data.email, // Para que puedas responder directamente
      subject: `Nuevo contacto: ${data.name}${data.company ? ` - ${data.company}` : ''}`,
      html: generateNotificationHTML(data),
      text: `
Nuevo contacto desde Zynera

${data.source ? `Origen: ${data.source}\n` : ''}
Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}\n` : ''}
${data.company ? `Empresa: ${data.company}\n` : ''}

Mensaje:
${data.message}

---
Puedes responder directamente a este email para contactar con ${data.name}.
      `.trim(),
    });

    console.log("✅ Notificación de contacto enviada a:", recipientEmail);
    return true;
  } catch (error: any) {
    console.error("❌ Error enviando notificación de contacto:", error);
    return false;
  }
}

function generateConfirmationHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Contacto - Zynera</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F6F8FA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F6F8FA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00E4FF, #147BFF); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: bold;">¡Mensaje Recibido!</h1>
              <p style="margin: 10px 0 0 0; color: #FFFFFF; opacity: 0.9; font-size: 16px;">Gracias por contactarnos</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Hola <strong>${data.name}</strong>,
              </p>
              
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo lo antes posible, normalmente en menos de 24 horas.
              </p>
              
              <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; border-left: 4px solid #00E4FF; margin: 30px 0;">
                <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Resumen de tu mensaje</p>
                <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              
              <p style="margin: 30px 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Mientras tanto, si tienes alguna pregunta urgente, puedes contactarnos directamente:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="tel:+34614095478" 
                   style="display: inline-block; background: linear-gradient(135deg, #00E4FF, #147BFF); color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 5px;">
                  📞 +34 614 095 478
                </a>
              </div>
              
              <p style="margin: 30px 0 0 0; color: #6B7280; font-size: 14px; line-height: 1.6; text-align: center;">
                Este es un email automático de confirmación. Por favor, no respondas a este mensaje.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E4E7EB;">
              <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;">
                <strong>Zynera</strong> - Automatización e Inteligencia Artificial
              </p>
              <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                Transformando negocios con IA y automatización
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendContactConfirmation(data: ContactFormData): Promise<boolean> {
  const resendInstance = initializeResend();
  
  if (!resendInstance) {
    console.warn("⚠️  Resend no configurado. No se puede enviar confirmación al cliente.");
    return false;
  }

  const fromEmail = process.env.EMAIL_FROM || "guillermo@zynerapro.com";
  const fromName = process.env.EMAIL_FROM_NAME || "Zynera";

  try {
    await resendInstance.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: data.email,
      subject: `Hemos recibido tu mensaje - Zynera`,
      html: generateConfirmationHTML(data),
      text: `
Hola ${data.name},

Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo lo antes posible, normalmente en menos de 24 horas.

Resumen de tu mensaje:
${data.message}

Si tienes alguna pregunta urgente, puedes contactarnos:
📞 +34 614 095 478

Este es un email automático de confirmación. Por favor, no respondas a este mensaje.

Zynera - Automatización e Inteligencia Artificial
      `.trim(),
    });

    console.log("✅ Email de confirmación enviado al cliente:", data.email);
    return true;
  } catch (error: any) {
    console.error("❌ Error enviando email de confirmación:", error);
    return false;
  }
}

