const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en platos.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevoPlato = document.createElement("div");
    nuevoPlato.classList = "tarjeta-producto"
    nuevoPlato.innerHTML = `
    <img src="./img/platos/${producto.id}.png" alt="Plato 1">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevoPlato);
    nuevoPlato.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(platos);

