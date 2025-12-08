# 🚀 Configuración del Backend en Vercel

Esta guía explica cómo configurar el backend API para que funcione en Vercel como funciones serverless.

## 📋 Estructura

El backend está configurado para funcionar como una función serverless de Vercel:

- **`api/index.ts`**: Punto de entrada para Vercel (wrapper de Express)
- **`api/src/`**: Código fuente del backend
- **`vercel.json`**: Configuración de Vercel para frontend y backend

## 🔧 Configuración de Variables de Entorno

**IMPORTANTE**: Debes configurar las siguientes variables de entorno en Vercel:

### En el Dashboard de Vercel:

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Añade las siguientes variables:

#### Variables Requeridas:

```env
# OpenAI
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini

# Airtable
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
AIRTABLE_TABLE_NAME=LEADS

# Resend (Email)
RESEND_API_KEY=re_...

# Email Configuration
EMAIL_FROM=guillermo@zynerapro.com
EMAIL_FROM_NAME=Zynera

# Frontend URL (para CORS)
FRONTEND_URL=https://tu-dominio.vercel.app

# Node Environment
NODE_ENV=production
```

### Cómo Añadir Variables:

1. En Vercel Dashboard → Tu Proyecto → **Settings** → **Environment Variables**
2. Haz clic en **Add New**
3. Añade cada variable con su valor
4. Selecciona los entornos donde aplicará (Production, Preview, Development)
5. Haz clic en **Save**

## 🔄 Actualizar el Frontend

Una vez desplegado, actualiza la variable `VITE_API_URL` en el frontend:

1. En Vercel Dashboard → Tu Proyecto → **Settings** → **Environment Variables**
2. Añade:
   ```env
   VITE_API_URL=https://tu-dominio.vercel.app
   ```
3. O déjalo vacío para usar rutas relativas (recomendado)

## 📝 Endpoints Disponibles

Una vez desplegado, los siguientes endpoints estarán disponibles:

- `GET /api/health` - Health check
- `POST /api/diagnosis` - Generar diagnóstico con OpenAI
- `POST /api/budget` - Generar presupuesto con OpenAI
- `POST /api/leads` - Guardar lead en Airtable y enviar email
- `POST /api/contact` - Enviar formulario de contacto

## 🧪 Probar el Backend

Después del despliegue, puedes probar el health check:

```bash
curl https://tu-dominio.vercel.app/api/health
```

Deberías recibir:
```json
{
  "status": "ok",
  "message": "Zynera API is running"
}
```

## 🔍 Solución de Problemas

### Error: "Module not found"

- Verifica que todas las dependencias estén en `api/package.json`
- Asegúrate de que `api/index.ts` importe correctamente los módulos

### Error: "Environment variable not found"

- Verifica que todas las variables de entorno estén configuradas en Vercel
- Asegúrate de que estén marcadas para el entorno correcto (Production)

### Error: CORS

- Verifica que `FRONTEND_URL` esté configurado correctamente
- O cambia el CORS a `origin: "*"` temporalmente para debug

### Las rutas no funcionan

- Verifica que `vercel.json` tenga la configuración correcta
- Asegúrate de que las rutas empiecen con `/api/`

## 📦 Dependencias

El backend necesita las siguientes dependencias (ya incluidas en `api/package.json`):

- `express` - Framework web
- `cors` - Manejo de CORS
- `openai` - Cliente de OpenAI
- `airtable` - Cliente de Airtable
- `resend` - Servicio de email
- `nodemailer` - Fallback para email
- `dotenv` - Variables de entorno (solo desarrollo)

## 🚀 Despliegue

Una vez configurado:

1. Haz commit y push de los cambios
2. Vercel detectará automáticamente los cambios
3. El backend se desplegará junto con el frontend
4. Verifica los logs en Vercel Dashboard → Deployments

## 📚 Recursos

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

