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
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">' +
      '<rect width="400" height="500" fill="#f3e6dc"/>' +
      '<rect x="150" y="195" width="100" height="80" rx="8" fill="none" stroke="#c9ad8c" stroke-width="6"/>' +
      '<circle cx="178" cy="222" r="10" fill="#c9ad8c"/>' +
      '<path d="M156 268 l30 -30 l20 18 l14 -12 l24 24" fill="none" stroke="#c9ad8c" stroke-width="6"/>' +
      '<text x="200" y="315" font-family="sans-serif" font-size="18" fill="#6b5a4e" text-anchor="middle">Imagen no disponible</text>' +
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

  // La foto es un botón: al tocarla se abre el visor con las fotos en grande
  const botonFoto = document.createElement("button");
  botonFoto.type = "button";
  botonFoto.className = "tarjeta__foto";
  botonFoto.setAttribute("aria-label", "Ver fotos de " + producto.nombre);
  botonFoto.onclick = function () {
    abrirVisor(producto);
  };

  const imagen = crearImagen(producto.imagen, producto.nombre);
  imagen.className = "tarjeta__imagen";
  imagen.loading = "lazy";
  botonFoto.appendChild(imagen);

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
  tarjeta.append(botonFoto, cuerpo);
  return tarjeta;
}

// Crea una imagen; si falla, muestra la imagen de reemplazo (una sola vez)
function crearImagen(ruta, textoAlternativo) {
  const imagen = document.createElement("img");
  // encodeURI permite nombres de archivo con espacios
  imagen.src = encodeURI(ruta);
  imagen.alt = textoAlternativo;
  imagen.width = 400;
  imagen.height = 500;
  imagen.onerror = function () {
    imagen.onerror = null;
    imagen.src = imagenReemplazo;
  };
  return imagen;
}

// Abre el visor con la foto principal en grande y, si existe, la imagen alterna
function abrirVisor(producto) {
  const visor = document.getElementById("visor");
  const fotos = document.getElementById("visor-fotos");

  document.getElementById("visor-titulo").textContent = producto.nombre;
  document.getElementById("visor-precio").textContent = formatearPrecio(producto.precio);

  fotos.innerHTML = "";
  fotos.appendChild(crearImagen(producto.imagen, producto.nombre));

  if (producto.imagen_alterna) {
    const alterna = crearImagen(producto.imagen_alterna, producto.nombre + " (otra vista)");
    // Si la imagen alterna no carga, simplemente no se muestra
    alterna.onerror = function () {
      alterna.remove();
    };
    fotos.appendChild(alterna);
  }

  visor.showModal();
}

// Prepara los botones para cerrar el visor
function prepararVisor() {
  const visor = document.getElementById("visor");
  document.getElementById("visor-cerrar").onclick = function () {
    visor.close();
  };
  // Tocar fuera del recuadro (en el fondo oscuro) también cierra
  visor.onclick = function (evento) {
    if (evento.target === visor) {
      visor.close();
    }
  };
  // La tecla Escape ya cierra el visor por defecto
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
prepararVisor();
mostrarAnioActual();
