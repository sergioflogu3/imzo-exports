# MEMORY.md — Tienda Online / Catálogo de Productos
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1 funcionando: catálogo visual de productos cargados dinámicamente.
- Los productos se generan desde las fotos de `public/img/` con `node generar-productos.js`,
  que actualiza `productos.json` (editable) y `productos.js` (copia que carga la página).
- Interfaz limpia y responsiva (CSS Grid) con tarjetas para imágenes, precio y descripción.
- Pie de página (footer) con datos de contacto directo (enlace a WhatsApp y teléfono).
- Por ahora hay 1 sola foto (de WhatsApp) con nombre, descripción y precio por defecto.

## Decisiones (y por qué)
- Sin backend, login ni carrito: es una web puramente expositiva e informativa.
- Apertura vía `file://` (doble clic): rutas relativas sin barra inicial (`public/img/...`) para no requerir servidor local.
- Copia `productos.js` además del JSON: con `file://` el navegador no permite `fetch` ni listar carpetas.
- El generador combina en vez de sobrescribir (clave: ruta `imagen`) para no perder nombres y precios editados.
- Precio `0` se muestra como "Precio a consultar" en vez de "Bs. 0,00".

## Aprendizajes y errores a evitar
- Editar `productos.json` sin volver a ejecutar el script: la web no cambia.
- Renombrar una foto crea un producto nuevo y borra el viejo (se pierden sus ediciones).
- Evitar espacios y caracteres raros (`#`, `%`) en nombres de imagen; usar `cafe-de-altura.jpg`.

## Próximos pasos
- Renombrar la foto de WhatsApp y completar nombres, descripciones y precios reales en `productos.json`.
