import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface Diagnosis {
  title: string;
  summary: string;
  recommendations: string[];
  priority: "high" | "medium" | "low";
  estimatedImpact: string;
}

export async function generateDiagnosis(answers: Array<{ question: string; answer: string }>): Promise<Diagnosis> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY no está configurada");
  }

  const answersText = answers
    .map((a, i) => `Pregunta ${i + 1}: ${a.question}\nRespuesta: ${a.answer}`)
    .join("\n\n");

  const prompt = `Eres un experto consultor en automatización e inteligencia artificial para empresas. 
Analiza las siguientes respuestas de un cliente y genera un diagnóstico personalizado.

Respuestas del cliente:
${answersText}

Genera un diagnóstico en formato JSON con la siguiente estructura exacta:
{
  "title": "Un título atractivo y específico (máximo 60 caracteres)",
  "summary": "Un resumen de 2-3 frases explicando las oportunidades identificadas",
  "recommendations": [
    "Recomendación 1 específica y accionable",
    "Recomendación 2 específica y accionable",
    "Recomendación 3 específica y accionable",
    "Recomendación 4 específica y accionable",
    "Recomendación 5 específica y accionable"
  ],
  "priority": "high" | "medium" | "low",
  "estimatedImpact": "Descripción breve del impacto estimado (ej: 'Alto - Ahorro de 20-40 horas semanales')"
}

IMPORTANTE:
- El título debe ser específico y relacionado con las respuestas del cliente
- Las recomendaciones deben ser concretas, accionables y relacionadas con automatización/IA
- El priority debe reflejar la urgencia/importancia basada en las respuestas
- El estimatedImpact debe ser realista y específico
- Responde SOLO con el JSON, sin texto adicional
- Usa español para todo el contenido`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un experto consultor en automatización empresarial. Siempre respondes en formato JSON válido."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No se recibió respuesta de OpenAI");
    }

    // Parsear el JSON
    const diagnosis = JSON.parse(content) as Diagnosis;

    // Validar estructura
    if (!diagnosis.title || !diagnosis.summary || !Array.isArray(diagnosis.recommendations)) {
      throw new Error("Respuesta de OpenAI no tiene el formato esperado");
    }

    // Asegurar que priority sea válido
    if (!["high", "medium", "low"].includes(diagnosis.priority)) {
      diagnosis.priority = "medium";
    }

    return diagnosis;
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    
    if (error instanceof SyntaxError) {
      throw new Error("Error al parsear la respuesta de OpenAI");
    }
    
    throw error;
  }
}

