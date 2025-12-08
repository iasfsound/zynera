# Zynera API - Flow Finder Backend

Backend API para el asistente de diagnóstico Flow Finder de Zynera.

## 🚀 Configuración

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita el archivo `.env` y añade tu API key de OpenAI:
```
OPENAI_API_KEY=tu_api_key_aqui
```

3. **Obtener API Key de OpenAI:**
   - Ve a https://platform.openai.com/api-keys
   - Crea una nueva API key
   - Cópiala en el archivo `.env`

## 🏃 Ejecutar

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:3001`

## 📡 Endpoints

### POST `/api/diagnosis`

Genera un diagnóstico personalizado basado en las respuestas del usuario.

**Request:**
```json
{
  "answers": [
    {
      "question": "¿En qué sector opera tu empresa?",
      "answer": "Retail/E-commerce"
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
    "summary": "...",
    "recommendations": [...],
    "priority": "high",
    "estimatedImpact": "..."
  }
}
```

## 🔧 Configuración del Frontend

Para que el frontend se conecte al backend, necesitas configurar un proxy en `vite.config.ts`:

```typescript
export default defineConfig({
  // ... otras configuraciones
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

## 📝 Notas

- El backend usa `gpt-4o-mini` por defecto (más económico)
- Si no hay API key configurada, devuelve un diagnóstico por defecto
- El servidor incluye manejo de errores y CORS configurado

