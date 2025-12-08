# 📧 Configuración de Leads y Emails

Esta guía explica cómo configurar el guardado de leads en Airtable y el envío de emails con el informe completo.

## 🗄️ Configuración de Airtable

### 1. Crear una base de datos en Airtable

1. Ve a [Airtable](https://airtable.com) y crea una nueva base
2. Crea una tabla llamada "Leads" (o el nombre que prefieras)
3. Añade las siguientes columnas:

| Nombre de Columna | Tipo | Descripción |
|------------------|------|-------------|
| Nombre | Single line text | Nombre del lead |
| Email | Email | Email del lead |
| Teléfono | Phone number | Teléfono (opcional) |
| Diagnóstico | Single line text | Título del diagnóstico |
| Resumen | Long text | Resumen del diagnóstico |
| Prioridad | Single select | high, medium, low |
| Impacto Estimado | Single line text | Impacto estimado |
| Recomendaciones | Long text | Recomendaciones separadas por saltos de línea |
| Respuestas | Long text | JSON con las respuestas del usuario |
| Fecha | Date | Fecha de creación |

### 2. Obtener API Key y Base ID

1. Ve a [Airtable Account](https://airtable.com/account)
2. En "API", copia tu **Personal access token** (API Key)
3. Ve a [Airtable API Docs](https://airtable.com/api)
4. Selecciona tu base y copia el **Base ID** (empieza con `app...`)

### 3. Configurar variables de entorno

Añade a tu archivo `.env`:

```env
AIRTABLE_API_KEY=tu_personal_access_token
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Leads
```

## 📧 Configuración de Email

Tienes 3 opciones para enviar emails:

### Opción 1: SMTP Genérico (Gmail, Outlook, etc.)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
```

**Para Gmail:**
1. Activa la verificación en 2 pasos
2. Genera una "Contraseña de aplicación" en [Google Account](https://myaccount.google.com/apppasswords)
3. Usa esa contraseña en `SMTP_PASS`

### Opción 2: Gmail OAuth2 (Recomendado para producción)

```env
GMAIL_USER=tu_email@gmail.com
GMAIL_CLIENT_ID=tu_client_id
GMAIL_CLIENT_SECRET=tu_client_secret
GMAIL_REFRESH_TOKEN=tu_refresh_token
```

**Configuración:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto y habilita Gmail API
3. Crea credenciales OAuth 2.0
4. Obtén el refresh token usando [esta guía](https://developers.google.com/identity/protocols/oauth2)

### Opción 3: SendGrid (Recomendado para alto volumen)

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

**Configuración:**
1. Crea cuenta en [SendGrid](https://sendgrid.com)
2. Genera una API Key en Settings > API Keys
3. Verifica tu dominio (opcional pero recomendado)

### Configuración del remitente

```env
EMAIL_FROM=noreply@zynera.com
EMAIL_FROM_NAME=Zynera
```

## 🧪 Probar la configuración

### Probar Airtable

```bash
# El endpoint guardará automáticamente cuando recibas un lead
# Revisa tu tabla de Airtable después de enviar un formulario
```

### Probar Email

Puedes probar el envío de emails haciendo una petición POST a `/api/leads`:

```bash
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "diagnosis": {
      "title": "Test Diagnosis",
      "summary": "Test summary",
      "recommendations": ["Rec 1", "Rec 2"],
      "priority": "high",
      "estimatedImpact": "High impact"
    },
    "answers": []
  }'
```

## 🔒 Seguridad

- **NUNCA** commitees el archivo `.env`
- Usa variables de entorno en producción (Vercel, Railway, etc.)
- Para Gmail, usa App Passwords, no tu contraseña principal
- Para producción, considera usar un servicio de email profesional (SendGrid, Mailgun, etc.)

## 🐛 Troubleshooting

### Airtable no guarda leads
- Verifica que `AIRTABLE_API_KEY` y `AIRTABLE_BASE_ID` están correctos
- Asegúrate de que el nombre de la tabla coincide con `AIRTABLE_TABLE_NAME`
- Revisa los logs del servidor para ver errores específicos

### Emails no se envían
- Verifica la configuración SMTP
- Para Gmail, asegúrate de usar App Password, no tu contraseña normal
- Revisa la carpeta de spam del destinatario
- Revisa los logs del servidor

### Error de autenticación
- Verifica que las credenciales son correctas
- Para Gmail OAuth2, asegúrate de que el refresh token es válido
- Para SendGrid, verifica que la API key tiene permisos de envío

## 📝 Notas

- Si Airtable o Email fallan, el proceso continúa (no bloquea al usuario)
- Los logs mostrarán si cada servicio funcionó correctamente
- En desarrollo, si no hay configuración de email, se mostrará un warning pero no fallará

