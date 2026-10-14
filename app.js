// =====================================================
// 1. DATOS DE LOS PRODUCTOS
// Los productos ya no están aquí: vienen de productos.js,
// que se genera a partir de productos.json con:
//   node generar-productos.js
// Para cambiar nombres, descripciones o precios, edita productos.json
// y vuelve a ejecutar ese comando.
// =====================================================

// =====================================================
// 2. CONFIGURACIÓN
// =====================================================
const simboloMoneda = "Bs.";

// Imagen de reemplazo (dibujo SVG incrustado) si la foto no existe o falla
const imagenReemplazo =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#f3e9da"/>' +
      '<rect x="150" y="95" width="100" height="80" rx="8" fill="none" stroke="#c9a77c" stroke-width="6"/>' +
      '<circle cx="178" cy="122" r="10" fill="#c9a77c"/>' +
      '<path d="M156 168 l30 -30 l20 18 l14 -12 l24 24" fill="none" stroke="#c9a77c" stroke-width="6"/>' +
      '<text x="200" y="215" font-family="sans-serif" font-size="18" fill="#9c7a52" text-anchor="middle">Imagen no disponible</text>' +
    "</svg>"
  );

// =====================================================
// 3. FUNCIONES
// =====================================================

// Convierte 45 en "Bs. 45,00" (si el precio es 0, muestra "Precio a consultar")
function formatearPrecio(precio) {
  if (precio === 0) {
    return "Precio a consultar";
  }
  const numero = precio.toLocaleString("es-BO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${simboloMoneda} ${numero}`;
}

// Crea el elemento HTML de una tarjeta de producto
function crearTarjeta(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";

  const imagen = document.createElement("img");
  imagen.className = "tarjeta__imagen";
  // encodeURI permite nombres de archivo con espacios
  imagen.src = encodeURI(producto.imagen);
  imagen.alt = producto.nombre;
  imagen.loading = "lazy";
  imagen.width = 400;
  imagen.height = 300;
  // Si la imagen falla, mostramos la imagen de reemplazo (una sola vez)
  imagen.onerror = function () {
    imagen.onerror = null;
    imagen.src = imagenReemplazo;
  };

  const cuerpo = document.createElement("div");
  cuerpo.className = "tarjeta__cuerpo";

  const titulo = document.createElement("h3");
  titulo.className = "tarjeta__titulo";
  titulo.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.className = "tarjeta__descripcion";
  descripcion.textContent = producto.descripcion;

  const precio = document.createElement("p");
  precio.className = "tarjeta__precio";
  precio.textContent = formatearPrecio(producto.precio);

  cuerpo.append(titulo, descripcion, precio);
  tarjeta.append(imagen, cuerpo);
  return tarjeta;
}

// Muestra un mensaje de texto en lugar de las tarjetas
function mostrarMensaje(texto) {
  const grilla = document.getElementById("grilla-productos");
  grilla.innerHTML = "";
  const mensaje = document.createElement("p");
  mensaje.className = "grilla__vacia";
  mensaje.textContent = texto;
  grilla.appendChild(mensaje);
}

// Dibuja todas las tarjetas dentro de la grilla
function mostrarCatalogo(listaProductos) {
  if (listaProductos.length === 0) {
    mostrarMensaje("Pronto tendremos productos nuevos.");
    return;
  }

  const grilla = document.getElementById("grilla-productos");
  grilla.innerHTML = "";
  listaProductos.forEach(function (producto) {
    grilla.appendChild(crearTarjeta(producto));
  });
}

// Coloca el año actual en el pie de página
function mostrarAnioActual() {
  document.getElementById("anio-actual").textContent = new Date().getFullYear();
}

// =====================================================
// 4. INICIO
// =====================================================
// Si falta productos.js, avisamos cómo generarlo
if (typeof productos === "undefined") {
  mostrarMensaje("No se encontró productos.js. Ejecuta: node generar-productos.js");
} else {
  mostrarCatalogo(productos);
}
mostrarAnioActual();
