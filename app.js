// =====================================================
// 1. DATOS DE LOS PRODUCTOS
// Para agregar, quitar o editar productos, cambia solo este arreglo.
// La imagen debe estar en la carpeta public/img/
// =====================================================
const productos = [
  {
    id: 1,
    nombre: "Miel de abeja pura",
    descripcion: "Frasco de 500 g, cosechada en los valles. Sin azúcar añadida.",
    precio: 45,
    imagen: "public/img/miel.jpg",
  },
  {
    id: 2,
    nombre: "Café de altura molido",
    descripcion: "Bolsa de 250 g, tostado medio. Aroma intenso y suave al paladar.",
    precio: 38,
    imagen: "public/img/cafe.jpg",
  },
  {
    id: 3,
    nombre: "Chocolate artesanal",
    descripcion: "Barra de 100 g con 70% de cacao amazónico.",
    precio: 25,
    imagen: "public/img/chocolate.jpg",
  },
  {
    id: 4,
    nombre: "Quinua real",
    descripcion: "Bolsa de 1 kg, lavada y lista para cocinar.",
    precio: 30,
    imagen: "public/img/quinua.jpg",
  },
  {
    id: 5,
    nombre: "Mermelada de frutilla",
    descripcion: "Frasco de 350 g, hecha en casa con fruta fresca.",
    precio: 22,
    imagen: "public/img/mermelada.jpg",
  },
  {
    id: 6,
    nombre: "Canasta de regalo",
    descripcion: "Incluye miel, café, chocolate y mermelada. Ideal para regalar.",
    precio: 120,
    imagen: "public/img/canasta.jpg",
  },
];

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

// Convierte 45 en "Bs. 45,00"
function formatearPrecio(precio) {
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
  imagen.src = producto.imagen;
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

// Dibuja todas las tarjetas dentro de la grilla
function mostrarCatalogo(listaProductos) {
  const grilla = document.getElementById("grilla-productos");
  grilla.innerHTML = "";

  if (listaProductos.length === 0) {
    grilla.innerHTML = '<p class="grilla__vacia">Pronto tendremos productos nuevos.</p>';
    return;
  }

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
mostrarCatalogo(productos);
mostrarAnioActual();
