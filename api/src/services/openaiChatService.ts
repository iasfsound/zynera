import OpenAI from "openai";

// Lazy initialization to ensure environment variables are loaded
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY no está configurada");
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `Eres un asistente virtual amigable y profesional de Zynera, una empresa especializada en automatización de procesos, inteligencia artificial y soluciones tecnológicas.

INFORMACIÓN SOBRE ZYNERA:
- Zynera ofrece servicios de automatización de procesos con IA
- Desarrollo y configuración de chatbots (WhatsApp, web u otros canales)
- Creación de asistentes internos basados en IA y datos del cliente
- Generación automática de contenido (texto, emails, publicaciones)
- Consultoría estratégica en IA y automatización
- Planes de mantenimiento y soporte (Zynera Care)

SERVICIOS PRINCIPALES:
1. Automatización de Procesos: Optimiza operaciones con flujos de trabajo inteligentes que ahorran tiempo y recursos
2. Chatbots con IA: Asistentes conversacionales avanzados que entienden y resuelven las necesidades de los clientes
3. Asistentes Internos Inteligentes: Herramientas de IA personalizadas que potencian la productividad del equipo
4. Estrategia e Implementación de IA: Soluciones de inteligencia artificial adaptadas al negocio del cliente

VENTAJAS:
- Ahorro de tiempo: Automatiza tareas repetitivas y libera horas valiosas
- Reducción de costes: Optimiza recursos y reduce gastos operativos
- Sistemas inteligentes: IA que aprende y se adapta a las necesidades del negocio
- Escalabilidad real: Infraestructura que escala con el crecimiento

INSTRUCCIONES:
- Responde de forma amigable, profesional y concisa
- Si te preguntan sobre precios o presupuestos, menciona que pueden usar el "Generador de Presupuesto Orientativo" en la página o contactar directamente
- Si te preguntan sobre cómo empezar, menciona el "Flow Finder" (Asistente de Diagnóstico) en la página
- Siempre invita a contactar directamente si necesitan más información o una consulta personalizada
- Mantén las respuestas en español
- Si no estás seguro de algo, admítelo y sugiere contactar directamente con el equipo

Responde de forma natural y conversacional, como si fueras un representante de atención al cliente.`;

export async function generateChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    const client = getOpenAIClient();
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: "user", content: userMessage },
    ];

    const completion = await client.chat.completions.create({
      model,
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No se recibió respuesta de OpenAI");
    }

    return response;
  } catch (error: any) {
    console.error("Error en generateChatResponse:", error);
    throw error;
  }
}

