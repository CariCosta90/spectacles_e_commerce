
let carrito = [];
const listadoCarrito = document.getElementById('elementos');
let actualizarContador = document.getElementById('contadorCarrito');
let precioTotal = document.getElementById('precioTotal');

// botonSeleccionado

function agregarProductosalCarrito(codigo){
    let verificar = carrito.find(prod=>prod.codigo==codigo);
    if(verificar){
        //alert('este producto ya esta en el carrito');
        verificar.cantidad++;
        document.getElementById(`cant${verificar.codigo}`).innerHTML = `<p id="cant${verificar.codigo}">${verificar.cantidad}</p>`
        actualizarCarrito();
    }else{
        let productoAgregado = productos.find(item=> item.codigo == codigo);
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
        mostrarCarrito(productoAgregado);
        actualizarCarrito();
    }

    }

function mostrarCarrito(productoAgregado) {

    //modal dentro de listadoCarrito
    let div = document.createElement("div");
        div.className = 'elementoCarrito';
        //Definimos el innerHTML del elemento con una plantilla de texto
        div.innerHTML = `   <p>${productoAgregado.nombre}</p>
                            <p id="precio${productoAgregado.codigo}">$${productoAgregado.precio}</p>
                            <p id="cant${productoAgregado.codigo}">${productoAgregado.cantidad}</p>
                            <button id="btn-eliminar${productoAgregado.codigo}" class="botonEliminar"><span class="material-symbols-outlined">
                                delete
                                </span></button>  `;
        listadoCarrito.appendChild(div); 

        //eliminar productos del carrito
        let btnEliminar = document.getElementById(`btn-eliminar${productoAgregado.codigo}`);
        btnEliminar.addEventListener('click', ()=> {
            if(productoAgregado.cantidad ==1){
                carrito = carrito.filter((item) => item.codigo !== productoAgregado.codigo)
                btnEliminar.parentElement.remove();
                actualizarCarrito();
            }else{
                productoAgregado.cantidad--;
                document.getElementById(`cant${productoAgregado.codigo}`).innerHTML = `<p id="cant${productoAgregado.codigo}">${productoAgregado.cantidad}</p>`
                actualizarCarrito();
            }
        })
}


/* descuento.push(new Descuentos(1, "Descuento del dia del nino", 15));
descuento.push(new Descuentos(2, "Descuento por convenio con empresa", 20));
descuento.push(new Descuentos(3, "Descuento por tarjeta de credito", 25)); */

    
function actualizarCarrito(){
// actualizar contador de productos
    actualizarContador.innerHTML = carrito.reduce((acc,el)=> acc+el.cantidad, 0);
// actualizar total
    precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+(el.precio*el.cantidad), 0);
    }

