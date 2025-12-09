# Despliegue del Backend en Render

Esta guía te ayudará a desplegar el backend de Zynera en Render.

## Pasos para el Despliegue

### 1. Crear cuenta en Render

1. Ve a [render.com](https://render.com)
2. Crea una cuenta (puedes usar GitHub para login)
3. Conecta tu repositorio de GitHub

### 2. Crear un nuevo Web Service

1. En el dashboard de Render, haz clic en "New +"
2. Selecciona "Web Service"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `zynera`

### 3. Configurar el Servicio

**Configuración básica:**
- **Name**: `zynera-api`
- **Environment**: `Node`
- **Region**: Elige la región más cercana a tus usuarios
- **Branch**: `main`
- **Root Directory**: `api` (importante: especifica que el servicio está en la carpeta `api`)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 4. Configurar Variables de Entorno

En la sección "Environment Variables" de Render, añade las siguientes variables:

#### Variables Requeridas:

```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://tu-dominio-vercel.vercel.app,https://www.tu-dominio.com
AIRTABLE_API_KEY=tu_api_key_de_airtable
AIRTABLE_BASE_ID=appJFEUIxvlpxcN3Z
AIRTABLE_TABLE_NAME=LEADS
OPENAI_API_KEY=sk-proj-tu_api_key_de_openai
OPENAI_MODEL=gpt-4o-mini
RESEND_API_KEY=tu_api_key_de_resend
NOTIFICATION_EMAIL=guillermo@zynerapro.com
EMAIL_FROM=guillermo@zynerapro.com
EMAIL_FROM_NAME=Zynera
```

**Nota sobre FRONTEND_URL:**
- Añade todas las URLs donde estará desplegado tu frontend (Vercel, dominio personalizado, etc.)
- Separa múltiples URLs con comas: `https://zynera.vercel.app,https://www.zynera.com`

### 5. Configurar el Frontend en Vercel

Una vez que Render despliegue tu backend, obtendrás una URL como:
`https://zynera-api.onrender.com`

**Configura la variable de entorno en Vercel:**

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://zynera-api.onrender.com/api` (⚠️ **IMPORTANTE**: Añade `/api` al final de la URL de Render)
   - **Environment**: Production, Preview, Development (según necesites)

### 6. Verificar el Despliegue

1. Una vez desplegado, verifica el health check:
   ```
   https://zynera-api.onrender.com/health
   ```
   Deberías ver: `{"status":"ok","message":"Zynera API is running"}`

2. Prueba los endpoints desde el frontend

## Estructura del Backend

El backend está en la carpeta `api/` y contiene:
- `src/index.ts` - Servidor Express principal
- `src/routes/` - Rutas de la API
- `src/services/` - Servicios (OpenAI, Airtable, Email)

## Endpoints Disponibles

- `POST /api/diagnosis` - Generar diagnóstico
- `POST /api/budget` - Generar presupuesto
- `POST /api/leads` - Guardar lead
- `POST /api/contact` - Enviar formulario de contacto
- `POST /api/chat` - Chat con asistente virtual
- `GET /health` - Health check

## Troubleshooting

### Error de CORS
Si ves errores de CORS, verifica que `FRONTEND_URL` en Render incluya todas las URLs del frontend.

### Error 404 en endpoints
Verifica que el `Root Directory` en Render esté configurado como `api`.

### Variables de entorno no cargadas
Asegúrate de que todas las variables estén configuradas en Render y que el servicio se haya reiniciado después de añadirlas.

