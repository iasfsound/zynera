# Guía de Despliegue en GoDaddy

Esta guía te ayudará a desplegar tu aplicación React en tu dominio de GoDaddy.

## Opción 1: Subir archivos vía cPanel File Manager (Recomendado)

### Paso 1: Acceder a cPanel
1. Inicia sesión en tu cuenta de GoDaddy
2. Ve a "Mi Producto" y selecciona tu hosting
3. Haz clic en "Administrar" y luego en "cPanel"

### Paso 2: Preparar los archivos
1. Asegúrate de que tu proyecto esté compilado:
   ```bash
   npm run build
   ```
2. Los archivos listos para subir están en la carpeta `build/`

### Paso 3: Subir archivos
1. En cPanel, abre "Administrador de archivos" (File Manager)
2. Navega a la carpeta `public_html` (o `www` si prefieres)
3. Si ya tienes archivos ahí, puedes:
   - Crear una subcarpeta para tu proyecto
   - O reemplazar los archivos existentes
4. Sube TODOS los archivos de la carpeta `build/`:
   - `index.html`
   - Carpeta `assets/` completa
   - Archivo `.htaccess` (ya incluido en build/)
5. Asegúrate de que el archivo `.htaccess` esté en la raíz de `public_html`

### Paso 4: Verificar permisos
- Los archivos deben tener permisos 644
- Las carpetas deben tener permisos 755

## Opción 2: Subir archivos vía FTP

### Paso 1: Obtener credenciales FTP
1. En cPanel, ve a "Cuentas FTP"
2. Crea una cuenta FTP o usa la existente
3. Anota: servidor FTP, usuario y contraseña

### Paso 2: Conectar con cliente FTP
Usa un cliente FTP como:
- **FileZilla** (gratis)
- **WinSCP** (Windows)
- **Cyberduck** (Mac/Windows)

### Paso 3: Subir archivos
1. Conéctate al servidor FTP
2. Navega a `public_html` (o `www`)
3. Sube todos los archivos de la carpeta `build/`
4. Asegúrate de subir el archivo `.htaccess`

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

