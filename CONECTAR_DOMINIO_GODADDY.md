# 🌐 Conectar Dominio de GoDaddy con Vercel

Esta guía te ayudará a conectar tu dominio de GoDaddy con tu sitio desplegado en Vercel.

## Paso 1: Agregar el dominio en Vercel

1. **Ve a tu proyecto en Vercel**
   - Inicia sesión en [vercel.com](https://vercel.com)
   - Selecciona tu proyecto

2. **Abre la configuración de dominios**
   - Haz clic en la pestaña **"Settings"** (Configuración)
   - En el menú lateral, haz clic en **"Domains"** (Dominios)

3. **Agrega tu dominio**
   - En el campo de texto, escribe tu dominio (ej: `tudominio.com`)
   - Haz clic en **"Add"** (Agregar)

4. **Vercel te mostrará las instrucciones**
   - Vercel te dará instrucciones específicas para configurar los DNS
   - **Anota estos valores**, los necesitarás en GoDaddy:
     - Un registro **A** con una IP (si es para el dominio raíz `@`)
     - Un registro **CNAME** (si es para `www`)

## Paso 2: Configurar DNS en GoDaddy

### Opción A: Dominio raíz (tudominio.com) - Usando registros A

1. **Accede a GoDaddy**
   - Ve a [godaddy.com](https://godaddy.com) e inicia sesión
   - Ve a **"Mis Productos"** → Selecciona tu dominio
   - Haz clic en **"Administrar DNS"** o **"DNS"**

2. **Agrega registros A**
   - Vercel te dará **4 direcciones IP** (pueden cambiar)
   - Agrega **4 registros A** con estos valores:
     - **Tipo**: A
     - **Nombre**: @ (o deja en blanco, según tu panel)
     - **Valor**: Primera IP de Vercel (ej: `76.76.21.21`)
     - **TTL**: 600 (o el valor por defecto)
   - Repite esto para las **4 IPs** que te dio Vercel

3. **Si ya tienes registros A existentes**
   - Elimina o modifica los registros A antiguos que apunten a otros servidores
   - Asegúrate de tener solo los 4 registros A de Vercel

### Opción B: Subdominio www (www.tudominio.com) - Usando CNAME

1. **En el panel DNS de GoDaddy**
   - Agrega un registro **CNAME**:
     - **Tipo**: CNAME
     - **Nombre**: www
     - **Valor**: `cname.vercel-dns.com` (o el que te indique Vercel)
     - **TTL**: 600 (o el valor por defecto)

2. **Si quieres ambos (dominio raíz Y www)**
   - Configura los registros A para `@` (dominio raíz)
   - Configura el CNAME para `www`

## Paso 3: Verificar la configuración

1. **Espera la propagación DNS**
   - Los cambios DNS pueden tardar desde unos minutos hasta 48 horas
   - Normalmente toma entre 1-24 horas
   - Puedes verificar el estado en Vercel

2. **Verifica en Vercel**
   - Vuelve a la página de **"Domains"** en Vercel
   - Verás el estado de tu dominio:
     - 🟡 **"Validating"** - Vercel está verificando la configuración
     - 🟢 **"Valid"** - ¡Todo está configurado correctamente!
     - 🔴 **"Invalid"** - Hay un problema, revisa los DNS

3. **Verifica con herramientas online**
   - Puedes usar [whatsmydns.net](https://www.whatsmydns.net) para verificar la propagación
   - Ingresa tu dominio y verifica que los registros A apunten a las IPs de Vercel

## Paso 4: Configurar SSL (Automático)

- ✅ **Vercel configura SSL automáticamente**
- Una vez que los DNS estén configurados correctamente, Vercel obtendrá un certificado SSL gratuito
- Esto puede tardar unos minutos después de que los DNS estén validados
- Tu sitio estará disponible en `https://tudominio.com`

## Configuración Recomendada

Para tener tanto el dominio raíz como www funcionando:

### En GoDaddy DNS:
```
Tipo    Nombre    Valor                    TTL
A       @         76.76.21.21             600
A       @         76.76.21.22             600
A       @         76.76.21.23             600
A       @         76.76.21.24             600
CNAME   www       cname.vercel-dns.com    600
```

### En Vercel:
- Agrega ambos dominios: `tudominio.com` y `www.tudominio.com`
- Vercel redirigirá automáticamente uno al otro (puedes configurar cuál es el principal)

## Solución de Problemas

### El dominio no se valida después de 24 horas:
1. Verifica que los registros DNS estén correctos
2. Asegúrate de haber eliminado registros A antiguos
3. Verifica que no haya conflictos con otros servicios (ej: email)
4. Contacta a Vercel si persiste el problema

### Error "DNS not configured correctly":
- Verifica que los registros A tengan las IPs correctas de Vercel
- Asegúrate de que el CNAME apunte a `cname.vercel-dns.com`
- Espera unos minutos y vuelve a verificar

### El sitio carga pero muestra "Not Found":
- Verifica que el dominio esté agregado correctamente en Vercel
- Asegúrate de que el proyecto esté desplegado correctamente
- Revisa que no haya errores en la configuración de Vercel

### ¿Puedo usar solo CNAME para el dominio raíz?
- **No**, GoDaddy no permite CNAME en el dominio raíz (`@`)
- Debes usar registros **A** para el dominio raíz
- Solo puedes usar CNAME para subdominios como `www`

## Notas Importantes

- ⚠️ **No elimines registros MX** (para email) a menos que no uses email en tu dominio
- ⚠️ **No elimines registros TXT** si los usas para verificación (SPF, DKIM, etc.)
- ✅ Los cambios DNS pueden tardar hasta 48 horas en propagarse completamente
- ✅ Vercel proporciona SSL gratuito automáticamente
- ✅ Puedes tener múltiples dominios apuntando al mismo proyecto

## Verificación Final

Una vez configurado, deberías poder:
- ✅ Acceder a `https://tudominio.com` y ver tu sitio
- ✅ Acceder a `https://www.tudominio.com` y ver tu sitio
- ✅ Ver el certificado SSL activo (candado verde en el navegador)

¡Listo! Tu dominio de GoDaddy está conectado con Vercel. 🎉

