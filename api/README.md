# Zynera API Backend

Backend API para Zynera, desplegado en Render.

## Estructura

```
api/
├── src/
│   ├── index.ts          # Servidor Express principal
│   ├── routes/           # Rutas de la API
│   │   ├── diagnosis.ts
│   │   ├── budget.ts
│   │   ├── leads.ts
│   │   ├── contact.ts
│   │   └── chat.ts
│   └── services/         # Servicios externos
│       ├── openaiService.ts
│       ├── openaiBudgetService.ts
│       ├── openaiChatService.ts
│       ├── airtableService.ts
│       ├── emailService.ts
│       └── notificationEmailService.ts
├── package.json
├── tsconfig.json
└── render.yaml           # Configuración para Render
```

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El servidor estará en http://localhost:3001
```

## Build y Producción

```bash
# Compilar TypeScript
npm run build

# Ejecutar producción
npm start
```

## Variables de Entorno

Crea un archivo `.env` en la carpeta `api/` con:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173,http://localhost:3000
AIRTABLE_API_KEY=tu_api_key
AIRTABLE_BASE_ID=appJFEUIxvlpxcN3Z
AIRTABLE_TABLE_NAME=LEADS
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=gpt-4o-mini
RESEND_API_KEY=tu_api_key
NOTIFICATION_EMAIL=guillermo@zynerapro.com
EMAIL_FROM=guillermo@zynerapro.com
EMAIL_FROM_NAME=Zynera
```

## Endpoints

- `GET /health` - Health check
- `POST /api/diagnosis` - Generar diagnóstico
- `POST /api/budget` - Generar presupuesto
- `POST /api/leads` - Guardar lead
- `POST /api/contact` - Formulario de contacto
- `POST /api/chat` - Chat con asistente virtual

## Despliegue en Render

Ver `DEPLOY_RENDER.md` para instrucciones detalladas.
