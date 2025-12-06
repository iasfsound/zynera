# Guía de Despliegue en GoDaddy

Esta guía te ayudará a desplegar tu aplicación React en tu dominio de GoDaddy.

## ⚡ Opción 1: Subir archivos vía FTP (RECOMENDADO - Más fácil y confiable)

Esta es la forma más sencilla y confiable de subir tus archivos.

### Paso 1: Preparar los archivos
1. Asegúrate de que tu proyecto esté compilado:
   ```bash
   npm run build
   ```
2. Los archivos listos para subir están en la carpeta `build/`

### Paso 2: Obtener credenciales FTP de GoDaddy

**Método A: Desde el panel de GoDaddy (nuevo diseño)**
1. Inicia sesión en [godaddy.com](https://godaddy.com)
2. Ve a "Mis Productos" → Selecciona tu hosting
3. Haz clic en "Administrar"
4. Busca la sección "FTP" o "Credenciales FTP"
5. Anota o crea un usuario FTP y contraseña
6. Anota el **servidor FTP** (generalmente algo como `ftp.tudominio.com` o una IP)

**Método B: Desde cPanel (si tienes acceso)**
1. Accede a cPanel (ver instrucciones abajo)
2. Busca "Cuentas FTP" o "FTP Accounts"
3. Si no tienes una cuenta, crea una nueva
4. Anota: **Servidor FTP**, **Usuario** y **Contraseña**

### Paso 3: Descargar e instalar FileZilla (Cliente FTP gratuito)

1. Ve a [filezilla-project.org](https://filezilla-project.org/download.php?type=client)
2. Descarga FileZilla Client para Windows
3. Instálalo siguiendo las instrucciones

### Paso 4: Conectar y subir archivos con FileZilla

1. **Abre FileZilla**
2. **Conecta al servidor:**
   - En la parte superior, ingresa:
     - **Servidor (Host)**: El servidor FTP que anotaste (ej: `ftp.tudominio.com`)
     - **Usuario**: Tu usuario FTP
     - **Contraseña**: Tu contraseña FTP
     - **Puerto**: 21 (o el que te indique GoDaddy)
   - Haz clic en "Conexión rápida" o presiona Enter

3. **Navega a la carpeta correcta:**
   - En el panel derecho (servidor remoto), navega a:
     - `public_html` (más común)
     - O `www` (algunos servidores)
     - O la carpeta raíz si es un subdominio

4. **Sube los archivos:**
   - En el panel izquierdo (tu computadora), navega a tu carpeta `build/`
   - Selecciona TODOS los archivos y carpetas:
     - `index.html`
     - Carpeta `assets/` (arrastra toda la carpeta)
     - Archivo `.htaccess` (si existe)
   - **Arrástralos** al panel derecho (servidor) o haz clic derecho → "Subir"
   - Espera a que termine la transferencia

5. **Verifica:**
   - Asegúrate de que todos los archivos se hayan subido correctamente
   - El `index.html` debe estar en la raíz de `public_html`
   - La carpeta `assets/` debe estar dentro de `public_html`

## Opción 2: Subir archivos vía cPanel File Manager

### Paso 1: Acceder a cPanel

**Si tienes el panel nuevo de GoDaddy:**
1. Inicia sesión en [godaddy.com](https://godaddy.com)
2. Ve a "Mis Productos" → Selecciona tu hosting
3. Haz clic en "Administrar"
4. Busca un botón o enlace que diga "cPanel" o "Panel de control"
5. Si no lo ves, busca "Herramientas avanzadas" o "Advanced Tools"

**Si tienes acceso directo a cPanel:**
1. Ve a `tudominio.com/cpanel` (reemplaza con tu dominio)
2. O usa la URL que te proporcionó GoDaddy

### Paso 2: Encontrar File Manager

En cPanel, busca una de estas opciones:
- **"File Manager"** (Administrador de archivos)
- **"Archivos"** → "Administrador de archivos"
- **Icono de carpeta** con el texto "File Manager"
- Puede estar en la sección "Archivos" o "Files"

**Si no encuentras File Manager:**
- Algunos planes de GoDaddy no incluyen cPanel completo
- En ese caso, **usa la Opción 1 (FTP)** que es más confiable

### Paso 3: Preparar los archivos
1. Asegúrate de que tu proyecto esté compilado:
   ```bash
   npm run build
   ```
2. Los archivos listos para subir están en la carpeta `build/`

### Paso 4: Subir archivos en File Manager

1. **Abre File Manager** en cPanel
2. **Navega a `public_html`:**
   - En el panel izquierdo, haz clic en `public_html`
   - O busca la carpeta `www` si no existe `public_html`
3. **Sube los archivos:**
   - Haz clic en el botón **"Subir"** o **"Upload"** (generalmente en la barra superior)
   - Selecciona todos los archivos de tu carpeta `build/`:
     - `index.html`
     - Todos los archivos dentro de `assets/`
     - Archivo `.htaccess` (si existe)
   - **Nota:** Puede que tengas que subir los archivos de `assets/` uno por uno o crear la carpeta primero
4. **Crea la carpeta assets si es necesario:**
   - Si no puedes subir la carpeta completa, crea una carpeta llamada `assets`
   - Luego sube los archivos dentro de esa carpeta

### Paso 5: Verificar permisos
- Selecciona los archivos y carpetas
- Haz clic derecho → "Cambiar permisos" o "Change Permissions"
- Archivos: 644
- Carpetas: 755

## Opción 3: Usar Git (si GoDaddy lo soporta)

Algunos planes de GoDaddy permiten usar Git:

1. En cPanel, busca "Git Version Control"
2. Crea un repositorio
3. Conecta tu repositorio de GitHub
4. Configura el hook post-receive para hacer build automático

## Verificación Post-Despliegue

1. Visita tu dominio en el navegador
2. Verifica que la aplicación carga correctamente
3. Prueba las rutas/navegación de tu aplicación
4. Abre las herramientas de desarrollador (F12) y verifica que no haya errores en la consola

## Solución de Problemas

### Si las rutas no funcionan:
- Verifica que el archivo `.htaccess` esté en la raíz de `public_html`
- Asegúrate de que el módulo `mod_rewrite` esté habilitado (contacta a GoDaddy si no lo está)

### Si los assets no cargan:
- Verifica que las rutas en `index.html` sean relativas o absolutas desde la raíz
- Revisa que todos los archivos de `assets/` se hayan subido correctamente

### Si ves un error 403 o 404:
- Verifica los permisos de archivos (644 para archivos, 755 para carpetas)
- Asegúrate de que `index.html` esté en la raíz de `public_html`

## Notas Importantes

- **Rutas absolutas**: Tu `index.html` usa rutas absolutas (`/assets/`), lo cual está bien si el sitio está en la raíz del dominio
- **Subcarpetas**: Si subes a una subcarpeta (ej: `public_html/mi-sitio/`), necesitarás ajustar las rutas en `vite.config.ts` con `base: '/mi-sitio/'`
- **HTTPS**: Asegúrate de tener un certificado SSL activado en GoDaddy para tu dominio

## Actualizaciones Futuras

Para actualizar tu sitio:
1. Ejecuta `npm run build` localmente
2. Sube los nuevos archivos de la carpeta `build/` reemplazando los antiguos
3. Limpia la caché del navegador si es necesario

