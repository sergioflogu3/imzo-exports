# MEMORY.md — Tienda Online / Catálogo de Productos
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1 funcionando: catálogo visual de productos cargados dinámicamente desde `app.js`.
- Interfaz limpia y responsiva (CSS Grid) con tarjetas para imágenes, precio y descripción.
- Pie de página (footer) con datos de contacto directo (enlace a WhatsApp y teléfono).

## Decisiones (y por qué)
- Sin backend, login ni carrito: es una web puramente expositiva e informativa.
- Apertura vía `file://` (doble clic): rutas relativas sin barra inicial (`public/img/...`) para no requerir servidor local.
- Arreglo de objetos en JS: permite agregar o modificar productos editando solo un archivo sin tocar el HTML.

## Aprendizajes y errores a evitar
- (vacío por ahora)

## Próximos pasos
- (vacío por ahora)
