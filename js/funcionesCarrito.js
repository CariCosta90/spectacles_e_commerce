
let carrito = [];
const listadoCarrito = document.getElementById('elementos');
const listadoPromos = document.getElementById('desc');
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
        });
}

function actualizarCarrito(){
// actualizar contador de productos
    actualizarContador.innerHTML = carrito.reduce((acc,el)=> acc+el.cantidad, 0);

    // actualizar total
    precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+(el.precio*el.cantidad), 0);
let btns = document.getElementsByClassName('btnDescuento');
for (var i = 0; i < btns.length; i++) {
for (const btn of btns){
    btns.addEventListener("click", function () {
        //console.log("HOLA");
        // console.log(this.id);
        // if (this.id ==1) {
        //     precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+(el.precio*el.cantidad), 0);
        // }else if (this.id==2){
        //     precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+((el.precio*el.cantidad)*0.85), 0);
        // }else if (this.id==3){
        //     precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+((el.precio*el.cantidad)*0.80), 0);
        // }else{
        //     precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+((el.precio*el.cantidad)*0.75), 0);
        // }
        let desc = Number(btn.value);
        console.log(btn.value);
        precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+(el.precio*el.cantidad)*desc, 0);
    });
}
    //precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+(el.precio*el.cantidad), 0);
    }
}
