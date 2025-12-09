import Airtable from "airtable";

let base: Airtable.Base | null = null;

function initializeAirtable() {
  if (base) return base; // Ya inicializado
  
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  
  if (!apiKey || !baseId) {
    console.warn("⚠️  Airtable no configurado. Las variables AIRTABLE_API_KEY y AIRTABLE_BASE_ID son requeridas.");
    console.warn(`   AIRTABLE_API_KEY: ${apiKey ? '✅ Configurada' : '❌ No configurada'}`);
    console.warn(`   AIRTABLE_BASE_ID: ${baseId ? '✅ Configurada' : '❌ No configurada'}`);
    return null;
  }
  
  try {
    const airtable = new Airtable({ apiKey });
    base = airtable.base(baseId);
    console.log("✅ Airtable inicializado correctamente");
    console.log(`   Base ID: ${baseId.substring(0, 10)}...`);
    return base;
  } catch (error) {
    console.error("❌ Error inicializando Airtable:", error);
    return null;
  }
}

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  diagnosis: any;
  budget?: any;
  mode?: "flowfinder" | "presupuesto";
  answers: Array<{ question: string; answer: string }>;
}

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string; // "hero", "cta", "contact-modal", etc.
}

export async function saveLeadToAirtable(data: LeadData): Promise<boolean> {
  // Inicializar Airtable de forma lazy (cuando se necesita)
  const airtableBase = initializeAirtable();
  
  if (!airtableBase) {
    console.warn("Airtable no configurado, saltando guardado de lead");
    return false;
  }

  try {
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Leads";
    
    await airtableBase(tableName).create([
      {
        fields: {
          "Nombre": data.name,
          "Email": data.email,
          "Teléfono": data.phone || "",
          "Diagnóstico": data.budget 
            ? `Presupuesto - ${data.budget.title || ""}`
            : (data.diagnosis?.title || ""),
          "Resumen": data.budget 
            ? data.budget.summary || ""
            : (data.diagnosis?.summary || ""),
          "Prioridad": data.budget 
            ? "medium"
            : (data.diagnosis?.priority || "medium"),
          "Impacto Estimado": data.budget 
            ? data.budget.estimatedBudget || ""
            : (data.diagnosis?.estimatedImpact || ""),
          "Recomendaciones": data.budget 
            ? data.budget.breakdown?.join("\n") || ""
            : (data.diagnosis?.recommendations?.join("\n") || ""),
          "Respuestas": JSON.stringify({
            tipo: data.mode === "presupuesto" ? "presupuesto" : "diagnostico",
            modo: data.mode || "flowfinder",
            respuestas: data.answers,
            presupuesto: data.budget || null,
            diagnostico: data.diagnosis || null,
          }),
          // Fecha: omitimos si está configurada para auto-generarse en Airtable
          // Si necesitas la fecha, descomenta la siguiente línea y ajusta el formato según tu configuración de Airtable
          // "Fecha": new Date().toISOString().split('T')[0],
        },
      },
    ]);

    console.log("✅ Lead guardado en Airtable:", data.email);
    return true;
  } catch (error: any) {
    console.error("❌ Error guardando lead en Airtable:", error);
    // No lanzamos el error para que el proceso continúe aunque Airtable falle
    return false;
  }
}

export async function saveContactToAirtable(data: ContactData): Promise<boolean> {
  // Inicializar Airtable de forma lazy (cuando se necesita)
  const airtableBase = initializeAirtable();
  
  if (!airtableBase) {
    console.warn("Airtable no configurado, saltando guardado de contacto");
    return false;
  }

  try {
    const tableName = process.env.AIRTABLE_TABLE_NAME || "LEADS";
    
    // Usar las mismas columnas que Flow Finder, adaptando los datos
    await airtableBase(tableName).create([
      {
        fields: {
          "Nombre": data.name,
          "Email": data.email,
          "Teléfono": data.phone || "",
          // Para formularios de contacto, usamos "Resumen" para el mensaje
          "Resumen": data.message,
          // Si hay empresa, la ponemos en "Diagnóstico" para identificarlo
          "Diagnóstico": data.company ? `Contacto - ${data.company}` : `Contacto - ${data.source || "Formulario"}`,
          // Prioridad por defecto para contactos
          "Prioridad": "medium",
          // Impacto estimado: indicamos que es un contacto
          "Impacto Estimado": `Contacto desde ${data.source || "formulario"}`,
          // Recomendaciones: guardamos información adicional del contacto
          "Recomendaciones": data.company ? `Empresa: ${data.company}\nOrigen: ${data.source || "unknown"}` : `Origen: ${data.source || "unknown"}`,
          // Respuestas: guardamos el mensaje completo en JSON para mantener consistencia
          "Respuestas": JSON.stringify({
            tipo: "contacto",
            origen: data.source || "unknown",
            mensaje: data.message,
            empresa: data.company || null,
          }),
          // Fecha: omitimos si está configurada para auto-generarse en Airtable
          // Si necesitas la fecha, descomenta la siguiente línea y ajusta el formato según tu configuración de Airtable
          // "Fecha": new Date().toISOString().split('T')[0],
        },
      },
    ]);

    console.log("✅ Contacto guardado en Airtable:", data.email);
    return true;
  } catch (error: any) {
    console.error("❌ Error guardando contacto en Airtable:", error);
    // No lanzamos el error para que el proceso continúe aunque Airtable falle
    return false;
  }
}

