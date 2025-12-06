# 🚀 Instrucciones Rápidas: Subir a GoDaddy con FTP

## Paso 1: Obtener credenciales FTP

1. Ve a [godaddy.com](https://godaddy.com) e inicia sesión
2. **Mis Productos** → Selecciona tu hosting → **Administrar**
3. Busca la sección **"FTP"** o **"Credenciales FTP"**
4. Anota:
   - **Servidor FTP** (ej: `ftp.tudominio.com`)
   - **Usuario FTP**
   - **Contraseña FTP**

## Paso 2: Descargar FileZilla

1. Ve a: https://filezilla-project.org/download.php?type=client
2. Descarga **FileZilla Client** para Windows
3. Instálalo

## Paso 3: Conectar y subir

1. **Abre FileZilla**
2. **Conecta:**
   - Servidor: `ftp.tudominio.com` (o el que te dio GoDaddy)
   - Usuario: Tu usuario FTP
   - Contraseña: Tu contraseña
   - Puerto: `21`
   - Clic en **"Conexión rápida"**

3. **Navega:**
   - Panel derecho (servidor): Ve a `public_html`
   - Panel izquierdo (tu PC): Ve a `C:\Users\Guille\Documents\ZYNERA\build`

4. **Sube los archivos:**
   - Selecciona en el panel izquierdo:
     - `index.html`
     - Carpeta `assets` completa
   - **Arrástralos** al panel derecho (a `public_html`)
   - Espera a que termine

5. **Listo!** Visita tu dominio en el navegador

## 📁 Estructura final en el servidor:

```
public_html/
  ├── index.html
  ├── assets/
  │   ├── index-CNdT3oF3.js
  │   ├── index-Cu6zMqDg.css
  │   └── ... (otros archivos)
```

