# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tienda Online / Catálogo de Productos

Web estática para exponer los productos de un vendedor local, sin login ni servidor backend. Proyecto didáctico: el código debe poder entenderlo alguien que empieza a programar.

## Stack y estructura

- HTML, CSS y JavaScript puros: sin frameworks, librerías, npm, bundler ni build.
- `index.html` (estructura), `styles.css` (estilos), `app.js` (lógica de renderizado), `public/img/` (imágenes de productos).
- Debe funcionar abriendo `index.html` con doble clic (`file://`): nada de módulos ES (`type="module"`), `fetch` a archivos locales ni nada que requiera servidor.

## Convenciones

- Textos de la interfaz, comentarios, documentación y mensajes de commit en español.
- Código simple, nombres descriptivos en `camelCase` para JS y `kebab-case` para CSS.
- Diseño limpio y responsive; la grilla de productos debe adaptarse perfectamente al móvil.
- Al construir o cambiar interfaces, aplicar la guía de `.claude/skills/frontend-design/SKILL.md`.

## Datos de productos

- Arreglo de objetos estático dentro de `app.js` con el formato `{ id, nombre, descripcion, precio, imagen }`.
- Sin backend ni pasarela de pago: es un catálogo expositivo/informativo.

## Imágenes y rutas (fácil equivocarse)

- Usar siempre rutas relativas directas (ej. `public/img/producto1.jpg`).
- Nunca usar barra inicial (`/public/img/`): rompe la carga al abrir el HTML vía `file://`.
- Incluir un fallback visual (`onerror`) por si una imagen no existe o falla al cargar.

## Forma de trabajar

- Hacer solo lo que se pide: no añadir carrito de compras, login ni formularios complejos por cuenta propia.
- Cambios pequeños y enfocados; no reescribir lo que ya funciona.
- Al terminar, resumir qué se cambió y cualquier decisión que el usuario deba revisar.

## Límites

- ✅ Siempre: mantener rutas relativas locales y textos en español.
- ⚠️ Preguntar antes: crear archivos nuevos, cambiar la estructura del objeto de productos.
- 🚫 Nunca: añadir dependencias (Bootstrap, Tailwind), frameworks o un paso de build.
- ✅ Siempre: actualizar `MEMORY.md` al terminar cada tarea. 

## Verificación

- No hay tests ni lint. Probar abriendo `index.html` en el navegador con doble clic.
- Verificar que el enlace de contacto (`wa.me` o `tel:`) abra correctamente la aplicación correspondiente.

## Memoria
- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones
tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su
porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de
dejarlo en la memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales). 


## Commits

- **Nunca hacer commit automáticamente.** Solo cuando el usuario lo pida explícitamente.
- `.claude/settings.local.json`: `git commit` y `git push` siempre requieren confirmación del usuario.
- Seguir el flujo de `.claude/skills/estandarizar-commits.md`:
  1. Si la rama es `main`/`master`, preguntar si hacer commit ahí o crear una rama (ej: `feat/...`, `fix/...`).
  2. Detenerse si hay cambios sin staging ("Tienes cambios que no se encuentran en staging").
  3. Detenerse si no hay nada en staging ("No se encuentran cambios disponibles para hacer commit").
  4. Formato del mensaje:
     ```
     [INTENCIÓN] Mensaje breve de lo que se hizo

     - Cambio 1

     Razones:
     - Razón 1
     ```
     Intenciones permitidas: `Feat`, `Bugfix`, `Refactor`, `Test`, `Doc`, `Design`.
