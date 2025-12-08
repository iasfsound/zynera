import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface Budget {
  title: string;
  summary: string;
  estimatedBudget: string;
  breakdown: string[];
  timeline: string;
  nextSteps: string[];
}

export async function generateBudget(answers: Array<{ question: string; answer: string }>): Promise<Budget> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY no está configurada");
  }

  const answersText = answers
    .map((a, i) => `Pregunta ${i + 1}: ${a.question}\nRespuesta: ${a.answer}`)
    .join("\n\n");

  const prompt = `Eres un experto consultor en automatización e inteligencia artificial para empresas. 
Analiza las siguientes respuestas de un cliente y genera un presupuesto orientativo personalizado.

Respuestas del cliente:
${answersText}

Genera un presupuesto en formato JSON con la siguiente estructura exacta:
{
  "title": "Un título atractivo y específico para el presupuesto (máximo 60 caracteres)",
  "summary": "Un resumen de 2-3 frases explicando el presupuesto y alcance",
  "estimatedBudget": "Rango de presupuesto en formato 'X.XXX€ - Y.YYY€' o 'Desde X.XXX€'",
  "breakdown": [
    "Item 1 del desglose",
    "Item 2 del desglose",
    "Item 3 del desglose",
    "Item 4 del desglose",
    "Item 5 del desglose"
  ],
  "timeline": "Plazo estimado de implementación (ej: '2-4 meses', '3-6 meses')",
  "nextSteps": [
    "Paso siguiente 1",
    "Paso siguiente 2",
    "Paso siguiente 3",
    "Paso siguiente 4"
  ]
}

IMPORTANTE:
- El presupuesto debe ser realista y basado en las respuestas del cliente
- El breakdown debe incluir los componentes principales del proyecto
- El timeline debe ser realista según la complejidad
- Los nextSteps deben ser acciones concretas
- Responde SOLO con el JSON, sin texto adicional
- Usa español para todo el contenido
- Los rangos de presupuesto deben ser apropiados para el mercado español`;

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
    const budget = JSON.parse(content) as Budget;

    // Validar estructura
    if (!budget.title || !budget.summary || !Array.isArray(budget.breakdown)) {
      throw new Error("Respuesta de OpenAI no tiene el formato esperado");
    }

    return budget;
  } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    
    if (error instanceof SyntaxError) {
      throw new Error("Error al parsear la respuesta de OpenAI");
    }
    
    throw error;
  }
}

