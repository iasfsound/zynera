# 📧 Configuración Rápida de Email para Formularios

Esta guía te ayudará a configurar el envío de emails para recibir notificaciones cuando alguien complete un formulario en tu sitio web.

## 🚀 Opción 1: Resend (Recomendado - Ya configurado)

Resend es el servicio de email que estamos usando. Es moderno, confiable y fácil de configurar.

### Paso 1: Obtener API Key de Resend

1. Ve a [Resend Dashboard](https://resend.com/api-keys)
2. Crea una nueva API Key o copia una existente
3. La API Key empieza con `re_`

### Paso 2: Configurar en `.env`

Abre el archivo `api/.env` y añade/actualiza:

```env
# Resend Configuration
RESEND_API_KEY=re_ToL1Xbsn_13nCwxysVDBJ7W7BUwRZTG2D
NOTIFICATION_EMAIL=guillermo@zynerapro.com
EMAIL_FROM=guillermo@zynerapro.com
EMAIL_FROM_NAME=Zynera
```

### Paso 3: Verificar dominio en Resend (Opcional pero recomendado)

1. Ve a [Resend Domains](https://resend.com/domains)
2. Añade tu dominio `zynerapro.com`
3. Configura los registros DNS que Resend te indique
4. Una vez verificado, puedes usar cualquier email del dominio

### Paso 4: Reiniciar el servidor

```bash
# Detén el servidor (Ctrl+C) y reinicia
npm run dev
```

¡Listo! Ahora recibirás notificaciones en `guillermo@zynerapro.com` cada vez que alguien complete un formulario.

---

## 🎯 Opción 2: Gmail (Alternativa)

### Paso 1: Activar verificación en 2 pasos
1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. Seguridad → Verificación en 2 pasos → Activar

### Paso 2: Generar Contraseña de Aplicación
1. Ve a [Contraseñas de aplicaciones](https://myaccount.google.com/apppasswords)
2. Selecciona "Correo" y "Otro (nombre personalizado)"
3. Escribe "Zynera API"
4. Copia la contraseña generada (16 caracteres sin espacios)

### Paso 3: Configurar en `.env`

Abre el archivo `api/.env` y añade/actualiza:

```env
# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_de_aplicación_aqui

# Email donde recibirás las notificaciones
NOTIFICATION_EMAIL=tu_email@gmail.com

# Email del remitente
EMAIL_FROM=tu_email@gmail.com
EMAIL_FROM_NAME=Zynera
```

**Ejemplo completo:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=guillermo@zynera.com
SMTP_PASS=abcd efgh ijkl mnop
NOTIFICATION_EMAIL=guillermo@zynera.com
EMAIL_FROM=guillermo@zynera.com
EMAIL_FROM_NAME=Zynera
```

### Paso 4: Reiniciar el servidor

```bash
# Detén el servidor (Ctrl+C) y reinicia
npm run dev
```

## 🎯 Opción 3: SendGrid (Alternativa)

### Paso 1: Crear cuenta en SendGrid
1. Ve a [SendGrid](https://sendgrid.com)
2. Crea una cuenta gratuita (hasta 100 emails/día gratis)

### Paso 2: Generar API Key
1. Settings → API Keys
2. Create API Key
3. Nombre: "Zynera API"
4. Permisos: "Full Access" o solo "Mail Send"
5. Copia la API Key (empieza con `SG.`)

### Paso 3: Configurar en `.env`

```env
# SendGrid Configuration
SENDGRID_API_KEY=SG.tu_api_key_aqui

# Email donde recibirás las notificaciones
NOTIFICATION_EMAIL=tu_email@example.com

# Email del remitente (debe estar verificado en SendGrid)
EMAIL_FROM=noreply@zynera.com
EMAIL_FROM_NAME=Zynera
```

## 📋 Verificación Rápida

Una vez configurado, prueba enviando un formulario desde tu sitio web. Deberías:

1. ✅ Ver en la consola del servidor: `✅ Notificación de contacto enviada a: tu_email@example.com`
2. ✅ Recibir un email en tu bandeja de entrada
3. ✅ El email debe tener toda la información del formulario

## 🐛 Troubleshooting

### No recibo emails
- Verifica que `NOTIFICATION_EMAIL` está configurado correctamente
- Revisa la carpeta de spam
- Revisa los logs del servidor para ver errores
- Para Gmail, asegúrate de usar una "Contraseña de aplicación", no tu contraseña normal

### Error de autenticación
- **Gmail**: Verifica que usas una "Contraseña de aplicación", no tu contraseña normal
- **SendGrid**: Verifica que la API Key es correcta y tiene permisos de envío

### El servidor no inicia
- Verifica que todas las variables están en el archivo `.env`
- Asegúrate de que no hay espacios extra en las variables
- Reinicia el servidor después de cambiar el `.env`

## 📝 Notas

- El email incluye un botón "Responder" que te permite responder directamente al cliente
- Todos los formularios (Hero, CTA, ContactModal) ahora envían notificaciones
- El sistema es resiliente: si el email falla, el formulario aún se envía (pero no recibirás notificación)

## 🎉 ¡Listo!

Una vez configurado, recibirás un email cada vez que alguien complete un formulario en tu sitio web.

