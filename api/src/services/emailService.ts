import nodemailer from "nodemailer";
import { Resend } from "resend";

interface EmailData {
  to: string;
  name: string;
  diagnosis: {
    title: string;
    summary: string;
    recommendations: string[];
    priority: string;
    estimatedImpact: string;
  };
  answers: Array<{ question: string; answer: string }>;
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

// Configurar transporter de email (fallback para otros servicios)
const createTransporter = () => {
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
};

const transporter = createTransporter();

function generateEmailHTML(data: EmailData): string {
  const recommendationsHTML = data.diagnosis.recommendations
    .map((rec, index) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E4E7EB;">
          <div style="display: flex; align-items: start; gap: 12px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #00E4FF, #147BFF); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
              <span style="color: white; font-weight: bold; font-size: 12px;">${index + 1}</span>
            </div>
            <p style="margin: 0; color: #374151; line-height: 1.6;">${rec}</p>
          </div>
        </td>
      </tr>
    `)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu Informe de Automatización - Zynera</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F6F8FA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F6F8FA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00E4FF, #147BFF); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: bold;">Tu Informe de Automatización</h1>
              <p style="margin: 10px 0 0 0; color: #FFFFFF; opacity: 0.9; font-size: 16px;">Zynera</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Hola <strong>${data.name}</strong>,
              </p>
              
              <p style="margin: 0 0 30px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Gracias por usar Flow Finder. Aquí está tu informe completo personalizado con ROI y propuestas concretas.
              </p>
              
              <!-- Diagnosis Title -->
              <div style="background: linear-gradient(135deg, rgba(0, 228, 255, 0.1), rgba(20, 123, 255, 0.1)); border-left: 4px solid #00E4FF; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 24px; font-weight: bold;">
                  ${data.diagnosis.title}
                </h2>
                <p style="margin: 0; color: #6B7280; font-size: 14px; line-height: 1.6;">
                  ${data.diagnosis.summary}
                </p>
              </div>
              
              <!-- Metrics -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td width="50%" style="padding-right: 10px;">
                    <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0 0 5px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Prioridad</p>
                      <p style="margin: 0; color: #111827; font-size: 20px; font-weight: bold; text-transform: capitalize;">${data.diagnosis.priority}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 10px;">
                    <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center;">
                      <p style="margin: 0 0 5px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Impacto Estimado</p>
                      <p style="margin: 0; color: #111827; font-size: 16px; font-weight: bold;">${data.diagnosis.estimatedImpact}</p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Recommendations -->
              <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: bold;">
                Recomendaciones Personalizadas
              </h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                ${recommendationsHTML}
              </table>
              
              <!-- CTA -->
              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #E4E7EB;">
                <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px;">
                  ¿Listo para automatizar tu negocio?
                </p>
                <a href="${process.env.FRONTEND_URL || 'https://zynera.com'}#cta-section" 
                   style="display: inline-block; background: linear-gradient(135deg, #00E4FF, #147BFF); color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Hablar con un experto
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E4E7EB;">
              <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;">
                <strong>Zynera</strong> - Automatización e Inteligencia Artificial
              </p>
              <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                Este informe fue generado automáticamente basado en tus respuestas.
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

export async function sendDiagnosisEmail(data: EmailData): Promise<boolean> {
  const fromEmail = process.env.EMAIL_FROM || "noreply@zynera.com";
  const fromName = process.env.EMAIL_FROM_NAME || "Zynera";

  // Inicializar Resend de forma lazy
  const resendInstance = initializeResend();
  
  // Usar Resend si está configurado (preferido)
  if (resendInstance) {
    try {
      await resendInstance.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: data.to,
        subject: `Tu Informe de Automatización - ${data.diagnosis.title}`,
        html: generateEmailHTML(data),
        text: `
Hola ${data.name},

${data.diagnosis.title}

${data.diagnosis.summary}

Recomendaciones:
${data.diagnosis.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Prioridad: ${data.diagnosis.priority}
Impacto Estimado: ${data.diagnosis.estimatedImpact}

¿Listo para automatizar tu negocio?
Visita: ${process.env.FRONTEND_URL || 'https://zynera.com'}

Zynera - Automatización e Inteligencia Artificial
        `.trim(),
      });

      console.log("✅ Email enviado con Resend a:", data.to);
      return true;
    } catch (error: any) {
      console.error("❌ Error enviando email con Resend:", error);
      return false;
    }
  }

  // Fallback a nodemailer si Resend no está configurado
  if (!transporter) {
    console.warn("⚠️  Email no configurado. Configura RESEND_API_KEY o SMTP para enviar emails.");
    return false;
  }

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: data.to,
      subject: `Tu Informe de Automatización - ${data.diagnosis.title}`,
      html: generateEmailHTML(data),
      text: `
Hola ${data.name},

${data.diagnosis.title}

${data.diagnosis.summary}

Recomendaciones:
${data.diagnosis.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Prioridad: ${data.diagnosis.priority}
Impacto Estimado: ${data.diagnosis.estimatedImpact}

¿Listo para automatizar tu negocio?
Visita: ${process.env.FRONTEND_URL || 'https://zynera.com'}

Zynera - Automatización e Inteligencia Artificial
      `.trim(),
    });

    console.log("✅ Email enviado a:", data.to);
    return true;
  } catch (error: any) {
    console.error("❌ Error enviando email:", error);
    return false;
  }
}

interface BudgetEmailData {
  to: string;
  name: string;
  budget: {
    title: string;
    summary: string;
    estimatedBudget: string;
    breakdown: string[];
    timeline: string;
    nextSteps: string[];
  };
  answers: Array<{ question: string; answer: string }>;
}

function generateBudgetEmailHTML(data: BudgetEmailData): string {
  const breakdownHTML = data.budget.breakdown
    .map((item, index) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E4E7EB;">
          <div style="display: flex; align-items: start; gap: 12px;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #00E4FF, #147BFF); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
              <span style="color: white; font-weight: bold; font-size: 12px;">${index + 1}</span>
            </div>
            <p style="margin: 0; color: #374151; line-height: 1.6;">${item}</p>
          </div>
        </td>
      </tr>
    `)
    .join("");

  const nextStepsHTML = data.budget.nextSteps
    .map((step, index) => `
      <tr>
        <td style="padding: 8px 0;">
          <p style="margin: 0; color: #374151; line-height: 1.6;">
            <strong>${index + 1}.</strong> ${step}
          </p>
        </td>
      </tr>
    `)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu Presupuesto - Zynera</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F6F8FA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F6F8FA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00E4FF, #147BFF); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: bold;">Tu Presupuesto Orientativo</h1>
              <p style="margin: 10px 0 0 0; color: #FFFFFF; opacity: 0.9; font-size: 16px;">Zynera</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Hola <strong>${data.name}</strong>,
              </p>
              
              <p style="margin: 0 0 30px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Gracias por usar nuestro Generador de Presupuesto. Aquí está tu presupuesto orientativo personalizado.
              </p>
              
              <!-- Budget Title -->
              <div style="background: linear-gradient(135deg, rgba(0, 228, 255, 0.1), rgba(20, 123, 255, 0.1)); border-left: 4px solid #00E4FF; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 24px; font-weight: bold;">
                  ${data.budget.title}
                </h2>
                <p style="margin: 0; color: #6B7280; font-size: 14px; line-height: 1.6;">
                  ${data.budget.summary}
                </p>
              </div>
              
              <!-- Estimated Budget -->
              <div style="background: linear-gradient(135deg, #00E4FF, #147BFF); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <p style="margin: 0 0 10px 0; color: #FFFFFF; opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Presupuesto Estimado</p>
                <p style="margin: 0; color: #FFFFFF; font-size: 36px; font-weight: bold;">${data.budget.estimatedBudget}</p>
                <p style="margin: 10px 0 0 0; color: #FFFFFF; opacity: 0.8; font-size: 12px;">Presupuesto orientativo basado en tus necesidades</p>
              </div>
              
              <!-- Breakdown -->
              <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: bold;">
                Desglose del Presupuesto
              </h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                ${breakdownHTML}
              </table>
              
              <!-- Timeline -->
              <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #00E4FF;">
                <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Plazo Estimado</p>
                <p style="margin: 0; color: #111827; font-size: 18px; font-weight: bold;">${data.budget.timeline}</p>
              </div>
              
              <!-- Next Steps -->
              <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: bold;">
                Próximos Pasos
              </h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                ${nextStepsHTML}
              </table>
              
              <!-- CTA -->
              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #E4E7EB;">
                <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px;">
                  ¿Listo para comenzar tu proyecto?
                </p>
                <a href="${process.env.FRONTEND_URL || 'https://zynera.com'}#cta-section" 
                   style="display: inline-block; background: linear-gradient(135deg, #00E4FF, #147BFF); color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Hablar con un experto
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E4E7EB;">
              <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 14px;">
                <strong>Zynera</strong> - Automatización e Inteligencia Artificial
              </p>
              <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                Este presupuesto es orientativo y puede variar según los detalles específicos del proyecto.
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

export async function sendBudgetEmail(data: BudgetEmailData): Promise<boolean> {
  const fromEmail = process.env.EMAIL_FROM || "guillermo@zynerapro.com";
  const fromName = process.env.EMAIL_FROM_NAME || "Zynera";

  // Usar Resend si está configurado (preferido)
  const resendInstance = initializeResend();
  
  if (resendInstance) {
    try {
      await resendInstance.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: data.to,
        subject: `Tu Presupuesto Orientativo - ${data.budget.title}`,
        html: generateBudgetEmailHTML(data),
        text: `
Hola ${data.name},

${data.budget.title}

${data.budget.summary}

Presupuesto Estimado: ${data.budget.estimatedBudget}
Plazo Estimado: ${data.budget.timeline}

Desglose:
${data.budget.breakdown.map((item, i) => `${i + 1}. ${item}`).join("\n")}

Próximos Pasos:
${data.budget.nextSteps.map((step, i) => `${i + 1}. ${step}`).join("\n")}

¿Listo para comenzar tu proyecto?
Visita: ${process.env.FRONTEND_URL || 'https://zynera.com'}

Zynera - Automatización e Inteligencia Artificial
        `.trim(),
      });

      console.log("✅ Email de presupuesto enviado con Resend a:", data.to);
      return true;
    } catch (error: any) {
      console.error("❌ Error enviando email de presupuesto con Resend:", error);
      return false;
    }
  }

  // Fallback a nodemailer si Resend no está configurado
  const transporter = createTransporter();
  
  if (!transporter) {
    console.warn("⚠️  Email no configurado. Configura RESEND_API_KEY o SMTP para enviar emails.");
    return false;
  }

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: data.to,
      subject: `Tu Presupuesto Orientativo - ${data.budget.title}`,
      html: generateBudgetEmailHTML(data),
      text: `
Hola ${data.name},

${data.budget.title}

${data.budget.summary}

Presupuesto Estimado: ${data.budget.estimatedBudget}
Plazo Estimado: ${data.budget.timeline}

Desglose:
${data.budget.breakdown.map((item, i) => `${i + 1}. ${item}`).join("\n")}

Próximos Pasos:
${data.budget.nextSteps.map((step, i) => `${i + 1}. ${step}`).join("\n")}

¿Listo para comenzar tu proyecto?
Visita: ${process.env.FRONTEND_URL || 'https://zynera.com'}

Zynera - Automatización e Inteligencia Artificial
      `.trim(),
    });

    console.log("✅ Email de presupuesto enviado a:", data.to);
    return true;
  } catch (error: any) {
    console.error("❌ Error enviando email de presupuesto:", error);
    return false;
  }
}

