const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  //Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("platos"));
  let cantidadProductoFinal;
  //Si no hay localstorage lo creo
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("platos",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    //Si hay localstorage me fijo si el artículo ya está ahí
    const indiceProducto = memoria.findIndex(plato => plato.id === producto.id)
    const nuevaMemoria = memoria;
    //Si el producto no está en el carrito lo agrego
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      //Si el producto está en el carrito le agrego 1 a la cantidad.
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("platos",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("platos"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(plato => plato.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("platos",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("platos"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("platos");
  actualizarNumeroCarrito();
}

actualizarNumeroCarrito();

/** Pagar carrito */
function pagarCarrito() {
  window.location.href = "compra.html"; // Redirige a la página de compra.html
}

// Función envío del Formulario
function enviarFormulario(event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  // Obtiene datos de contacto
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const email = document.getElementById('contactoEmail').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  if (!nombre || !apellido || !email || !telefono) {
      alert("Por favor, completa todos los campos de contacto.");
      return; // detiene la ejecucuión de la función hasta que pase el if
  }

  // Envía el formulario a Formspree
  document.getElementById('formulario').submit();
}