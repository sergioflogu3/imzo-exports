// =====================================================
// GENERADOR DE PRODUCTOS
// Lee las imágenes de public/img/ y actualiza productos.json y productos.js.
//
// Uso (en una terminal, dentro de la carpeta del proyecto):
//   node generar-productos.js
//
// - productos.json: aquí editas nombres, descripciones y precios.
// - productos.js: copia que usa la página (no la edites a mano).
// - Segunda foto de un producto: nómbrala igual + "_alterna"
//   (ej. Zapallita.jpeg y Zapallita_alterna.jpeg).
// Tus ediciones se conservan al volver a ejecutar el script.
// =====================================================
const fs = require("fs");
const path = require("path");

const carpetaImagenes = path.join(__dirname, "public", "img");
const archivoJson = path.join(__dirname, "productos.json");
const archivoJs = path.join(__dirname, "productos.js");
const extensionesValidas = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
// Las fotos que terminan en "_alterna" no son productos: son la segunda foto
// del producto con el mismo nombre (ej. Zapallita.jpeg + Zapallita_alterna.jpeg)
const sufijoAlterna = "_alterna";

// Lista los nombres de archivo de imagen dentro de public/img/
function leerImagenes() {
  if (!fs.existsSync(carpetaImagenes)) {
    return [];
  }
  return fs
    .readdirSync(carpetaImagenes)
    .filter(function (archivo) {
      const extension = path.extname(archivo).toLowerCase();
      return extensionesValidas.includes(extension);
    })
    .sort();
}

// Lee productos.json; si no existe devuelve una lista vacía
function leerProductosGuardados() {
  if (!fs.existsSync(archivoJson)) {
    return [];
  }
  const texto = fs.readFileSync(archivoJson, "utf8");
  try {
    return JSON.parse(texto);
  } catch (error) {
    console.error("ERROR: productos.json tiene un error de escritura (revisa comas y comillas).");
    console.error(error.message);
    console.error("No se modificó ningún archivo.");
    process.exit(1);
  }
}

// Convierte "cafe-de-altura.jpg" en "Cafe de altura"
function nombreDesdeArchivo(archivo) {
  const sinExtension = path.parse(archivo).name;
  const conEspacios = sinExtension.replace(/[-_]+/g, " ").trim();
  return conEspacios.charAt(0).toUpperCase() + conEspacios.slice(1);
}

// ¿Es una imagen alterna? (ej. "Zapallita_alterna.jpeg")
function esAlterna(archivo) {
  return path.parse(archivo).name.toLowerCase().endsWith(sufijoAlterna);
}

// Busca la imagen alterna de un archivo principal: "Zapallita.jpeg" -> "Zapallita_alterna.jpg"
// Devuelve "" si no existe
function buscarAlterna(archivoPrincipal, alternas) {
  const nombreBuscado = (path.parse(archivoPrincipal).name + sufijoAlterna).toLowerCase();
  const encontrada = alternas.find(function (archivo) {
    return path.parse(archivo).name.toLowerCase() === nombreBuscado;
  });
  return encontrada ? "public/img/" + encontrada : "";
}

// Combina los productos guardados con las imágenes encontradas
function combinarProductos(todasLasImagenes, productosGuardados) {
  const imagenes = todasLasImagenes.filter(function (archivo) {
    return !esAlterna(archivo);
  });
  const alternas = todasLasImagenes.filter(esAlterna);
  const rutasAlternas = alternas.map(function (archivo) {
    return "public/img/" + archivo;
  });

  const rutasImagenes = imagenes.map(function (archivo) {
    return "public/img/" + archivo;
  });

  // Conservamos los productos cuya imagen todavía existe
  const conservados = productosGuardados.filter(function (producto) {
    return rutasImagenes.includes(producto.imagen);
  });
  const eliminados = productosGuardados.filter(function (producto) {
    return !rutasImagenes.includes(producto.imagen);
  });

  // Imagen alterna: se respeta la que ya tenga (si el archivo existe);
  // si no, se busca "<nombre>_alterna" en la carpeta
  conservados.forEach(function (producto) {
    if (!rutasAlternas.includes(producto.imagen_alterna)) {
      producto.imagen_alterna = buscarAlterna(path.basename(producto.imagen), alternas);
    }
  });

  // Siguiente id libre
  let siguienteId = 1;
  conservados.forEach(function (producto) {
    if (producto.id >= siguienteId) {
      siguienteId = producto.id + 1;
    }
  });

  // Agregamos las imágenes que todavía no tienen producto
  const nuevos = [];
  imagenes.forEach(function (archivo) {
    const ruta = "public/img/" + archivo;
    const yaExiste = conservados.some(function (producto) {
      return producto.imagen === ruta;
    });
    if (!yaExiste) {
      nuevos.push({
        id: siguienteId,
        nombre: nombreDesdeArchivo(archivo),
        descripcion: "Descripción del producto",
        precio: 0,
        imagen: ruta,
        imagen_alterna: buscarAlterna(archivo, alternas),
      });
      siguienteId++;
    }
  });

  return {
    productos: conservados.concat(nuevos),
    nuevos: nuevos,
    eliminados: eliminados,
  };
}

// Guarda productos.json y productos.js
function guardarArchivos(productos) {
  const json = JSON.stringify(productos, null, 2);
  fs.writeFileSync(archivoJson, json + "\n", "utf8");

  const contenidoJs =
    "// Archivo generado por generar-productos.js — no editar.\n" +
    "// Edita productos.json y vuelve a ejecutar: node generar-productos.js\n" +
    "const productos = " + json + ";\n";
  fs.writeFileSync(archivoJs, contenidoJs, "utf8");
}

// ===== INICIO =====
const imagenes = leerImagenes();
const productosGuardados = leerProductosGuardados();
const resultado = combinarProductos(imagenes, productosGuardados);
guardarArchivos(resultado.productos);

resultado.nuevos.forEach(function (producto) {
  console.log("+ Agregado: " + producto.nombre + " (" + producto.imagen + ")");
});
resultado.eliminados.forEach(function (producto) {
  console.log("- Quitado (su imagen ya no existe): " + producto.nombre + " (" + producto.imagen + ")");
});
console.log(
  "Listo: " + resultado.nuevos.length + " agregados, " +
  resultado.eliminados.length + " quitados, " +
  resultado.productos.length + " productos en total."
);
