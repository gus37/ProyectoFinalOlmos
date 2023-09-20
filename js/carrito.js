//Defino las variables que necesito

let carrito = [];
let total = 0;
let descuentoEnPesos = 0; 


// Defino los productos usando un constructor

function Producto(nombre, precio, descripcion, imagen) {
  this.nombre = nombre;
  this.precio = precio;
  this.descripcion = descripcion;
  this.imagen = imagen;
}

// creo productos usando el constructor:

const producto1 = new Producto(
  "Ecografo Portatil",
  3697400,
  "Nuevo Ecógrafo Portátil B/N Doppler Mindray DP-10PWP SINEBI. Pulsado Pantalla LCD LED con ENVÍO BONIFICADO A TODO EL PAIS. Nuevo Diseño, mas moderno, mas funciones y Disco interno mas grande.",
  "img/1-ecografo.webp"
);
const producto2 = new Producto(
  "Ecógrafo Rodante",
  5590000,
  "Para diagnóstico por imagen, cardiológía (Echo stress opcional) 4D, gineco obstetricia, kinesiología, traumatología, biopsias, urología, etc.",
  "img/2-eco rodante.webp"
);
const producto3 = new Producto(
  "Monitor Multi",
  829300,
  "Monitor de paciente con pantalla táctil a color de 8.4 pulgadas. Para monitorizar ECG, SpO2, NIBP, temperatura y frecuencia respiratoria. Bajo consumo de energia.",
  "img/3-monitor.webp"
);
const producto4 = new Producto(
  "Holter",
  355110,
  "Con pantalla LCD color. Incluye: Grabador/Registrador, Software de analisis para PC en castellano, el manguito es de alta calidad en tensión adulto y manual de uso.",
  "img/4-holter.webp"
);
const producto5 = new Producto(
  "Doppler Fetal",
  48999,
  "Proporciona un sonido nítido de latidos cardíacos fetales, obteniendo las lecturas de la frecuencia cardiaca fetal. Sin radiación",
  "img/5-dopler fetal.webp"
);
const producto6 = new Producto(
  "Bomba De Infusion",
  579790,
  "Con control de flujo de alta precisión y medidas integrales de alarma para garantizar la seguridad del paciente y un óptimo efecto terapéutico.",
  "img/6-bombe de infusion.webp"
);
const producto7 = new Producto(
  "Oxímetro niños",
  17125,
  "Con pantalla de alta resolución, de fácil lectura que permitirá ahorrar batería, prolongando la duración del aparato. Además, gracias a su tecnología es apto para utilizarse bajo cualquier condición de luz. ",
  "img/7-oximetro pediatrico.webp"
);
const producto8 = new Producto(
  "Kit de Control",
  21999,
  "Oxímetro De Pulso Saturómetro Saturador De Oxígeno Termómetro Infrarrojo Digital Medidor De Presión Arterial",
  "img/8-kit.webp"
);

// coloco los productor en un array para acceder a ellos

const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8];

// Obtengo todas las referencias a elementos HTML
const contenedorProductos = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");
const guardarCarritoBtn = document.getElementById("guardar-carrito");

// creo función que le da formato a los precios con puntos para los miles y los millones:

function formatearNumero(numero) {
  
  return numero.toLocaleString('es-AR', { style: 'decimal' });
}

// Función para crear tarjetas de productos
function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  tarjeta.appendChild(imagen);

  const nombre = document.createElement("h2");
  nombre.textContent = producto.nombre;
  tarjeta.appendChild(nombre);

  const descripcion = document.createElement("h5");
  descripcion.textContent = producto.descripcion;
  tarjeta.appendChild(descripcion);

  const textoSimple = document.createElement("p");
  textoSimple.textContent = "Para ver todo el detalle, posa el puntero del mouse.";
  tarjeta.appendChild(textoSimple);

  // Formatea el precio usando la función formatearNumero y le coloca los puntos en mil y millon 
   const precioFormateado = formatearNumero(producto.precio);
  const precio = document.createElement("span");
  precio.textContent = `$ ${precioFormateado}`;
  tarjeta.appendChild(precio);

  const botonAgregar = document.createElement("button");
  botonAgregar.textContent = "Agregar al Carrito";
  botonAgregar.addEventListener("click", () => {
    agregarAlCarrito(producto);
  });
  tarjeta.appendChild(botonAgregar);

  return tarjeta;
}

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
  const productoEnCarrito = carrito.find(
    (item) => item.nombre === producto.nombre
  );

  if (productoEnCarrito) {
    // Si el producto ya está en el carrito, aumenta la cantidad en 1.
    productoEnCarrito.cantidad += 1;
  } else {
    // Si el producto no está en el carrito, lo agrega con cantidad 1.
    carrito.push({ ...producto, cantidad: 1 });
  }

  // Actualiza el total sumando el precio del producto agregado.
  total += producto.precio;
  actualizarCarrito();
}

// Itera sobre los productos y crea las tarjetas
productos.forEach((producto) => {
  const tarjeta = crearTarjetaProducto(producto);
  contenedorProductos.appendChild(tarjeta);
});

// Función para actualizar el carrito
function actualizarCarrito() {
  const carritoElement = document.getElementById("act");
  carritoElement.innerHTML = "";

  carrito.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.nombre} - Cantidad: ${item.cantidad}`;

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "+";
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(item);
    });

    const botonQuitar = document.createElement("button");
    botonQuitar.textContent = "-";
    botonQuitar.addEventListener("click", () => {
      quitarDelCarrito(item);
    });

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Borrar";
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(item);
    });

    listItem.appendChild(botonAgregar);
    listItem.appendChild(botonQuitar);
    listItem.appendChild(botonEliminar);

    carritoElement.appendChild(listItem);
  });

  // Calcula el total en pesos
  total = carrito.reduce((accumulator, item) => accumulator + item.precio * item.cantidad, 0);
   
  total -= descuentoEnPesos;
  
  // Convierte el total en pesos a dólares y actualiza el elemento DOM
  actualizarTotalEnDolares(total);

  // Muestra el total en el elemento HTML
  const totalFormateado = formatearNumero(total);
  totalCarrito.textContent = ` $ ${totalFormateado}`;
}

//Función que va restando productos de la lista de productos de a uno.

function quitarDelCarrito(producto) {
  const productoEnCarrito = carrito.find(
    (item) => item.nombre === producto.nombre
  );

  if (productoEnCarrito) {
    // Disminuye la cantidad en 1, pero no permite que sea menor que 0.
    productoEnCarrito.cantidad = Math.max(0, productoEnCarrito.cantidad - 1);

    if (productoEnCarrito.cantidad === 0) {
      // Si la cantidad llega a cero, elimina el producto del carrito.
      eliminarDelCarrito(producto);
    }
  }

  // Actualiza el total restando el precio del producto quitado.
  total -= producto.precio;
  actualizarCarrito();
}

//Esta función elimina el producto completo de la lista de productos.

function eliminarDelCarrito(producto) {
  const indice = carrito.findIndex((item) => item.nombre === producto.nombre);

  if (indice !== -1) {
    // Elimina el producto del carrito usando el índice.
    carrito.splice(indice, 1);
  }

  // Actualiza el total restando el precio del producto eliminado.
  total -= producto.precio * producto.cantidad;
  actualizarCarrito();
}

// Función para guardar el carrito en el localStorage

function guardarCarrito() {
  // Verifica si el carrito está vacío antes de guardar los datos y despliega un sweet alert.
  if (carrito.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito Vacío",
      text: "No puedes guardar un carrito vacío.",
      width: 500,
      padding: "1em",
      timer: 4000,
      timerProgressBar: true,
      color: "#fff",
      iconColor: "#fff",
      showConfirmButton: false,
      customClass: {
        popup: "alert_blur",
      },
    });
    return; // Sale de la función si el carrito está vacío
  }

  // Convierte el carrito a una cadena JSON y lo guarda en localStorage
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carritoData", carritoJSON);

  // Muestra un mensaje de éxito o realiza otras acciones según sea necesario
  Swal.fire({
    icon: "success",
    title: "🛒 Carrito guardado correctamente 🛒",
    width: 500,
    padding: "1em",
    timer: 4000,
    timerProgressBar: true,
    color: "#fff",
    iconColor: "#fff",
    showConfirmButton: false,
    customClass: {
      popup: "alert_blur",
    },
  });
}

// Agrega un evento al botón "Guardar Carrito"
guardarCarritoBtn.addEventListener("click", () => {
  guardarCarrito();
});

// Función para mostrar el carrito en un SweetAlert
function mostrarCarrito() {
  const carritoJSON = localStorage.getItem("carritoData");
  let mensaje = "";

  if (carritoJSON) {
    const carrito = JSON.parse(carritoJSON);
    mensaje += "Tu carrito tiene guardado:\n\n";
    
    carrito.forEach((item) => {
      // Crea un elemento <div> para cada producto y su cantidad
      const productoDiv = document.createElement("div");
      productoDiv.textContent = `${item.nombre} - Cantidad: ${item.cantidad}`;

      // Agrega el elemento <div> al mensaje
      mensaje += productoDiv.outerHTML + "\n";
    });
    // Agrega el total al mensaje
    const totalFormateado = formatearNumero(total);
    mensaje += `Total: $ ${totalFormateado}\n`;
  } else {
    mensaje = "No hay productos en tu carrito.";
  }

  Swal.fire({
    icon: "info",
    title: "Carrito de Compras",
    html: mensaje,
    width: 500,
    padding: "1em",
    color: "#fff",
    iconColor: "#fff",
    timerProgressBar: true,
    confirmButtonText: "Cerrar",
    customClass: {
      popup: "alert_blur",
    },
  });
}

const mostrarCarritoBtn = document.getElementById("mostrar-carrito");
mostrarCarritoBtn.addEventListener("click", mostrarCarrito);

//Esta función borra toda la lista de compras.

function limpiarCarrito() {
  carrito = []; // Vacía el arreglo del carrito
  total = 0; // Reinicia el total a cero
  actualizarCarrito(); // Actualiza la visualización del carrito en la página
}

const limpiarCarritoBtn = document.getElementById("limpiar-carrito");

limpiarCarritoBtn.addEventListener("click", () => {
  limpiarCarrito();
});

const borrarCarritoBtn = document.getElementById("borrar-carrito");

borrarCarritoBtn.addEventListener("click", () => {
  // (borra el array carrito y restablece el total).
  carrito = [];
  total = 0;
  actualizarCarrito(); 

  // Elimina el carrito del localStorage.
  localStorage.removeItem("carritoData");

  // muestra un mensaje que ya se borro el carrito
  Swal.fire({
    icon: "info",
    title: "Carrito Limpio 👩‍🏭 🛒",
    text: "El carrito ha sido eliminado.",
    width: 500,
    padding: "1em",
    color: "#fff",
    iconColor: "#fff",
    timer: 4000,
    timerProgressBar: true,
    confirmButtonText: "Cerrar",
    customClass: {
      popup: "alert_blur",
    },
  });
});

// Funcion de descuento:

// Obtengo referencias a elementos HTML
const codigoDescuentoInput = document.getElementById("codigo-descuento");
const aplicarDescuentoBtn = document.getElementById("aplicar-descuento");

// Agrega un evento al botón "Aplicar Descuento"
aplicarDescuentoBtn.addEventListener("click", () => {
  const codigoDescuento = codigoDescuentoInput.value;

  // Llama a la función para aplicar el descuento
  aplicarDescuento(codigoDescuento);
});

// Variable para rastrear si el descuento se ha aplicado
let descuentoAplicado = false;

// Función para aplicar un descuento al carrito

function aplicarDescuento(codigoDescuento) {

  // Aplica el descuento del 30%
const porcentajeDescuento = 30;

// Calcula el descuento en pesos
descuentoEnPesos = (total * porcentajeDescuento) / 100;

// Resta el descuento del total en pesos
total -= descuentoEnPesos;


  // Verifica si ya se aplicó el descuento y muestra un mensaje que ya se aplico y que no se puede volver a usar el codigo.
  if (descuentoAplicado) {
    Swal.fire({
      icon: "info",
      title: "Descuento ya aplicado",
      text: "El descuento ya se ha aplicado anteriormente.",
      width: 500,
      padding: "1em",
      timer: 4000,
      timerProgressBar: true,
      color: "#fff",
      iconColor: "#fff",
      showConfirmButton: false,
      customClass: {
        popup: "alert_blur",
      },
    });
    return; // Sale de la función si el descuento ya se aplicó
  }

  // Verifica si hay productos en el carrito y sino muestra un mensaje que esta vació el carrito
  if (carrito.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No hay productos en el carrito",
      text: "Agrega productos al carrito antes de aplicar un descuento.",
      width: 500,
      padding: "1em",
      timer: 4000,
      timerProgressBar: true,
      color: "#fff",
      iconColor: "#fff",
      showConfirmButton: false,
      customClass: {
        popup: "alert_blur",
      },
    });
    return; // Sale de la función si no hay productos en el carrito
  }

  // Esta constante contiene el codigo valido que va a usar el usuario
  const codigoValido = "DESCUENTO123";

  // Verifica si el código ingresado es válido
  if (codigoDescuento === codigoValido) {
    // Define aquí el porcentaje de descuento
    const porcentajeDescuento = 30; 

    // Calcula el descuento en pesos
    const descuentoEnPesos = (total * porcentajeDescuento) / 100;

    // Resta el descuento del total en pesos
    total -= descuentoEnPesos;

    // Marca el descuento como aplicado
    descuentoAplicado = true;

    // Actualiza la visualización del carrito
    actualizarCarrito();

    // Muestra un mensaje de éxito
    Swal.fire({
      icon: "success",
      title: "Descuento aplicado correctamente",
      text: `Se ha aplicado un descuento del ${porcentajeDescuento}% al total en pesos.`,
      width: 500,
      padding: "1em",
      timer: 4000,
      timerProgressBar: true,
      color: "#fff",
      iconColor: "#fff",
      showConfirmButton: false,
      customClass: {
        popup: "alert_blur",
      },
    });
  } else {
    // Muestra un mensaje de error si el código no es válido
    Swal.fire({
      icon: "error",
      title: "Código de descuento no válido",
      text: "El código ingresado no es válido o ha expirado.",
      width: 500,
      padding: "1em",
      timer: 4000,
      timerProgressBar: true,
      color: "#fff",
      iconColor: "#fff",
      showConfirmButton: false,
      customClass: {
        popup: "alert_blur",
      },
    });
  }
}

// Función para convertir el total a dolares.

// Función para obtener la tasa de cambio de DolarAPI

async function obtenerTasaDeCambio() {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
    if (!response.ok) {
      throw new Error('La solicitud a la API no tuvo éxito.');
    }
    const responseData = await response.text(); // Obtiene la respuesta como texto
    const data = JSON.parse(responseData);
    return data.venta; // Obtiene la tasa de venta del dólar
  } catch (error) {
    console.error('Error al obtener la tasa de cambio:', error);
    return null;
  }
}

// Función para actualizar el total en dólares

async function actualizarTotalEnDolares(totalEnPesos) {
  const tasaCambio = await obtenerTasaDeCambio();

  if (tasaCambio !== null) {
    let totalEnDolares = 0;
    if (totalEnPesos > 0) {
      totalEnDolares = totalEnPesos / tasaCambio;
    }

    const totalEnDolaresElement = document.getElementById('total-usd');
    totalEnDolaresElement.textContent = `Total en Dólares: u$s ${totalEnDolares.toFixed(2)}`;
  }
}



