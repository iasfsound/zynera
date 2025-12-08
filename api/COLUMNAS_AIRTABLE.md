# 📋 Columnas Requeridas en Airtable

Para que los formularios se guarden correctamente en Airtable, la tabla **LEADS** debe tener las siguientes columnas:

## Columnas Compartidas (Flow Finder + Formularios de Contacto)

| Nombre de Columna | Tipo | Descripción | Uso |
|------------------|------|-------------|-----|
| **Nombre** | Single line text | Nombre del lead/contacto | Ambos |
| **Email** | Email | Email del lead/contacto | Ambos |
| **Teléfono** | Phone number | Teléfono (opcional) | Ambos |
| **Diagnóstico** | Single line text | Título del diagnóstico o identificación del contacto | Ambos |
| **Resumen** | Long text | Resumen del diagnóstico o mensaje del contacto | Ambos |
| **Prioridad** | Single select | Opciones: `high`, `medium`, `low` | Ambos |
| **Impacto Estimado** | Single line text | Impacto estimado o origen del contacto | Ambos |
| **Recomendaciones** | Long text | Recomendaciones o información adicional | Ambos |
| **Respuestas** | Long text | JSON con respuestas o datos del contacto | Ambos |
| **Fecha** | Date | Fecha de creación | Ambos |

## 📝 Cómo se Mapean los Datos

### Flow Finder (Diagnóstico)
- **Diagnóstico**: Título del diagnóstico generado por IA
- **Resumen**: Resumen del diagnóstico
- **Prioridad**: Prioridad calculada (high/medium/low)
- **Impacto Estimado**: Impacto estimado del diagnóstico
- **Recomendaciones**: Lista de recomendaciones
- **Respuestas**: JSON con `{ tipo: "diagnostico", respuestas: [...] }`

### Formularios de Contacto
- **Diagnóstico**: `"Contacto - [Empresa]"` o `"Contacto - [Origen]"`
- **Resumen**: Mensaje del formulario
- **Prioridad**: `"medium"` (por defecto)
- **Impacto Estimado**: `"Contacto desde [origen]"`
- **Recomendaciones**: Información adicional (empresa, origen)
- **Respuestas**: JSON con `{ tipo: "contacto", origen: "...", mensaje: "...", empresa: "..." }`

## 🔍 Cómo Distinguir en Airtable

Para distinguir entre contactos y diagnósticos, revisa el campo **Respuestas**:
- Si contiene `"tipo": "diagnostico"` → Es un diagnóstico del Flow Finder
- Si contiene `"tipo": "contacto"` → Es un formulario de contacto

O revisa el campo **Diagnóstico**:
- Si empieza con `"Contacto -"` → Es un formulario de contacto
- Si tiene un título descriptivo → Es un diagnóstico del Flow Finder

## ✅ Verificación

Después de añadir las columnas, prueba enviando:
1. Un formulario de contacto (Hero, CTA, o ContactModal)
2. Un diagnóstico del Flow Finder

Ambos deberían aparecer en tu tabla LEADS con sus respectivos datos.

