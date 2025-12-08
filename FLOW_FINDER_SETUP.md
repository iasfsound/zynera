# 🚀 Flow Finder - Guía de Configuración

## 📋 Descripción

Flow Finder es el módulo "estrella" interactivo de Zynera que permite a los usuarios obtener un diagnóstico personalizado sobre qué procesos de su negocio pueden automatizarse con IA.

**Flujo completo:**
1. Usuario responde 5 preguntas
2. Se genera diagnóstico con OpenAI
3. Se muestra un resumen (primeras 3 recomendaciones)
4. Usuario deja sus datos (nombre, email, teléfono opcional)
5. Se guarda el lead en Airtable
6. Se envía email con informe completo personalizado

## 🏗️ Arquitectura

- **Frontend**: Componente React `FlowFinder.tsx` integrado en la home
- **Backend**: API Express en la carpeta `api/` que se conecta con:
  - OpenAI (para generar diagnósticos)
  - Airtable (para guardar leads)
  - Servicio de Email (para enviar informes completos)
- **IA**: Utiliza GPT-4o-mini de OpenAI para generar diagnósticos personalizados

## ⚙️ Configuración Local

### 1. Backend (API)

```bash
cd api
npm install
```

Crea un archivo `.env` en la carpeta `api/`:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=tu_api_key_aqui
OPENAI_MODEL=gpt-4o-mini
NODE_ENV=development
```

**Obtener API Key de OpenAI:**
1. Ve a https://platform.openai.com/api-keys
2. Crea una nueva API key
3. Cópiala en el archivo `.env`

**Configurar Airtable y Email (Opcional pero recomendado):**
- Ver `api/LEADS_SETUP.md` para configuración completa
- Básico: Añade `AIRTABLE_API_KEY` y `AIRTABLE_BASE_ID` para guardar leads
- Añade configuración SMTP para enviar emails

**Ejecutar el backend:**
```bash
npm run dev
```

El servidor estará en `http://localhost:3001`

### 2. Frontend

El frontend ya está configurado con un proxy en `vite.config.ts` que redirige las peticiones `/api` al backend.

**Ejecutar el frontend:**
```bash
npm run dev
```

## 🌐 Despliegue

### Opción 1: Vercel (Recomendado)

#### Backend:
1. Ve a [Vercel](https://vercel.com)
2. Importa el proyecto
3. Configura el directorio raíz como `api/`
4. Añade las variables de entorno:
   - `OPENAI_API_KEY`
   - `FRONTEND_URL` (URL de tu frontend desplegado)
5. Vercel detectará automáticamente el `vercel.json`

#### Frontend:
1. Despliega el frontend normalmente en Vercel
2. Actualiza `FRONTEND_URL` en el backend con la URL del frontend

### Opción 2: Backend separado + Frontend en Vercel

Si prefieres tener el backend en otro servicio (Railway, Render, etc.):

1. Despliega el backend en tu servicio preferido
2. Obtén la URL del backend (ej: `https://zynera-api.railway.app`)
3. Actualiza `vite.config.ts` para producción o usa variables de entorno:

```typescript
// En producción, el proxy no funciona, usa la URL completa
const API_URL = import.meta.env.VITE_API_URL || 'https://zynera-api.railway.app';
```

4. Actualiza `FlowFinder.tsx` para usar la variable de entorno:

```typescript
const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/diagnosis`, {
  // ...
});
```

5. Añade `VITE_API_URL` a las variables de entorno de Vercel

## 🔧 Estructura de Archivos

```
api/
├── src/
│   ├── index.ts              # Servidor Express principal
│   ├── routes/
│   │   └── diagnosis.ts      # Endpoint POST /api/diagnosis
│   └── services/
│       └── openaiService.ts  # Integración con OpenAI
├── package.json
├── tsconfig.json
├── vercel.json
└── .env                      # Variables de entorno (no commitear)

src/components/
└── FlowFinder.tsx            # Componente React del asistente
```

## 📡 API Endpoints

### POST `/api/diagnosis`

Genera un diagnóstico personalizado basado en las respuestas del usuario.

**Request:**
```json
{
  "answers": [
    {
      "question": "¿En qué sector opera tu empresa?",
      "answer": "Retail/E-commerce"
    },
    {
      "question": "¿Cuál es tu principal desafío operativo?",
      "answer": "Procesos manuales repetitivos"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "diagnosis": {
    "title": "Automatización para E-commerce",
    "summary": "Basado en tus respuestas...",
    "recommendations": [
      "Implementar chatbots inteligentes...",
      "Automatizar procesos repetitivos..."
    ],
    "priority": "high",
    "estimatedImpact": "Alto - Ahorro de 20-40 horas semanales"
  }
}
```

### POST `/api/leads`

Guarda un lead y envía el informe completo por email.

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+34 123 456 789",
  "diagnosis": {
    "title": "Automatización para E-commerce",
    "summary": "...",
    "recommendations": [...],
    "priority": "high",
    "estimatedImpact": "..."
  },
  "answers": [...]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead guardado y email enviado",
  "details": {
    "airtable": true,
    "email": true
  }
}
```

**Nota:** Si Airtable o Email no están configurados, el endpoint aún devuelve éxito (no bloquea al usuario).

## 🎨 Personalización

### Modificar las preguntas

Edita el array `questions` en `src/components/FlowFinder.tsx`:

```typescript
const questions: Question[] = [
  {
    id: "1",
    question: "Tu pregunta aquí",
    type: "multiple",
    options: ["Opción 1", "Opción 2"]
  }
];
```

### Ajustar el prompt de OpenAI

Edita la función `generateDiagnosis` en `api/src/services/openaiService.ts` para cambiar cómo se genera el diagnóstico.

### Cambiar el modelo de OpenAI

Modifica `OPENAI_MODEL` en el `.env`:
- `gpt-4o-mini` (más económico, recomendado)
- `gpt-4o` (más potente, más caro)
- `gpt-3.5-turbo` (alternativa económica)

## 🐛 Troubleshooting

### Error: "OPENAI_API_KEY no está configurada"
- Verifica que el archivo `.env` existe en `api/`
- Asegúrate de que la variable `OPENAI_API_KEY` está definida

### Error: CORS
- Verifica que `FRONTEND_URL` en el backend coincide con la URL del frontend
- En desarrollo: `http://localhost:5173`
- En producción: URL completa del frontend

### El diagnóstico no se genera
- Revisa los logs del backend
- Verifica que tienes créditos en tu cuenta de OpenAI
- El backend devuelve un diagnóstico por defecto si OpenAI falla

## 📝 Notas

- El backend incluye un diagnóstico por defecto si OpenAI no está disponible
- El componente es completamente responsive
- Las animaciones usan Framer Motion (ya incluido en el proyecto)
- El diseño sigue el sistema de diseño de Zynera (colores y estilos)

## 🎯 Próximos Pasos

- [ ] Añadir analytics para trackear uso
- [ ] Implementar caché de diagnósticos similares
- [ ] Añadir más tipos de preguntas (sliders, checkboxes múltiples)
- [ ] Integrar con CRM para guardar leads
- [ ] Añadir exportación de diagnóstico en PDF

