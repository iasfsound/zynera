# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu aplicación React en Vercel de forma rápida y sencilla.

## Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Asegúrate de que tu código esté en GitHub

1. Verifica que todos tus cambios estén subidos:
   ```bash
   git status
   git push origin main
   ```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"** o **"Log In"**
3. Selecciona **"Continue with GitHub"** para conectar tu cuenta
4. Autoriza a Vercel para acceder a tus repositorios

### Paso 3: Importar tu proyecto

1. En el dashboard de Vercel, haz clic en **"Add New..."** → **"Project"**
2. Busca y selecciona tu repositorio **"zynera"** (o el nombre que tenga)
3. Haz clic en **"Import"**

### Paso 4: Configurar el proyecto

Vercel debería detectar automáticamente que es un proyecto Vite. Verifica que:

- **Framework Preset**: Vite (debería detectarse automáticamente)
- **Root Directory**: `./` (raíz del proyecto)
- **Build Command**: `npm run build` (ya configurado)
- **Output Directory**: `build` (ya configurado)
- **Install Command**: `npm install` (ya configurado)

### Paso 5: Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el proceso (2-3 minutos)
3. ¡Listo! Tu sitio estará disponible en una URL como: `tu-proyecto.vercel.app`

### Paso 6: Configurar dominio personalizado (Opcional)

Si quieres usar tu dominio de GoDaddy:

📖 **Ver la guía completa**: Consulta `CONECTAR_DOMINIO_GODADDY.md` para instrucciones detalladas paso a paso.

**Resumen rápido:**
1. En Vercel: **Settings** → **Domains** → Agrega tu dominio
2. En GoDaddy: **Administrar DNS** → Agrega los registros que Vercel te indique:
   - Para dominio raíz (`@`): 4 registros **A** con las IPs de Vercel
   - Para `www`: 1 registro **CNAME** apuntando a `cname.vercel-dns.com`
3. Espera la propagación DNS (1-24 horas)
4. ¡Listo! Vercel configurará SSL automáticamente

## Opción 2: Despliegue con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Iniciar sesión

```bash
vercel login
```

### Paso 3: Desplegar

```bash
vercel
```

Sigue las instrucciones en la terminal. Para producción:

```bash
vercel --prod
```

## Configuración Automática

El archivo `vercel.json` ya está configurado con:
- ✅ Comando de build correcto
- ✅ Directorio de salida (`build`)
- ✅ Rewrites para SPA (Single Page Application)
- ✅ Framework detectado como Vite

## Actualizaciones Automáticas

Una vez conectado con GitHub, cada vez que hagas `git push` a la rama `main`, Vercel desplegará automáticamente una nueva versión.

## Ventajas de Vercel

- ✅ **Despliegue automático** desde GitHub
- ✅ **SSL gratuito** (HTTPS automático)
- ✅ **CDN global** (sitio rápido en todo el mundo)
- ✅ **Preview deployments** (cada PR tiene su propia URL)
- ✅ **Métricas y analytics** integrados
- ✅ **Gratis** para proyectos personales

## Solución de Problemas

### Si el build falla:
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel para ver el error específico

### Si las rutas no funcionan:
- El archivo `vercel.json` ya incluye los rewrites necesarios
- Si persiste, verifica que el archivo esté en la raíz del proyecto

### Si los assets no cargan:
- Verifica que la carpeta `build/assets/` se haya generado correctamente
- Revisa las rutas en `index.html` (deben ser relativas o absolutas desde `/`)

## Comandos Útiles

```bash
# Ver información del proyecto
vercel inspect

# Ver logs de despliegue
vercel logs

# Listar todos los despliegues
vercel list
```

