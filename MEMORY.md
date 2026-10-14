# MEMORY.md — Tienda Online / Catálogo de Productos
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- Marca: **IMZO Importaciones** (ropa, accesorios, belleza, hogar). Logo en `public/logo.png`.
- Los productos se generan desde las fotos de `public/img/` con `node generar-productos.js`,
  que actualiza `productos.json` (editable) y `productos.js` (copia que carga la página).
- Segunda foto: `<nombre>_alterna.<ext>` se guarda en `imagen_alterna` (no crea producto).
- Al tocar una foto se abre un `<dialog>` (visor) con la foto grande + la alterna.
- `dist/`: copia lista para subir al dominio (index.html, styles.css, app.js, productos.js, public/).
  Se arma a mano; hay que volver a copiar tras cada cambio.
- Diseño con colores del logo (rosado #f7eae1, negro, dorado); precio como etiqueta negra.

## Decisiones (y por qué)
- Sin backend, login ni carrito: es una web puramente expositiva e informativa.
- Apertura vía `file://` (doble clic): rutas relativas sin barra inicial (`public/img/...`) para no requerir servidor local.
- Copia `productos.js` además del JSON: con `file://` el navegador no permite `fetch` ni listar carpetas.
- El generador combina en vez de sobrescribir (clave: ruta `imagen`) para no perder nombres y precios editados.
- Precio `0` se muestra como "Precio a consultar" en vez de "Bs. 0,00".
- Paleta tomada del logo IMZO (antes violeta/naranja: chocaba con el logo).
- Fotos 4:5 porque las fotos de ropa son verticales (4:3 recortaba las prendas).

## Aprendizajes y errores a evitar
- Editar `productos.json` sin volver a ejecutar el script: la web no cambia.
- Renombrar una foto crea un producto nuevo y borra el viejo (se pierden sus ediciones).
- Evitar espacios y caracteres raros (`#`, `%`) en nombres de imagen; usar `cafe-de-altura.jpg`.
- Captura móvil con Edge headless: `--window-size` estrecho no sirve; usar un iframe de 390px.

- Windows no distingue mayúsculas: `cp` a "Zapallita_alterna" sobrescribió "zapallita_alterna".
  Nunca copiar/crear archivos de prueba en `public/img/`; usar el scratchpad.

## Próximos pasos
- Verificar el visor en el navegador (no se pudo capturar en headless).
- 20 productos; 9 sin descripción ni precio (Coneja, Gatubela, Harry 1-2, Leon, Militar, Mostacho, Orejas, Selena). Erratas: "guerrea", "Farquuad".

