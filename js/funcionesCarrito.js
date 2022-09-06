
let carrito = [];
const listadoCarrito = document.getElementById('elementos');
const listadoPromos = document.getElementById('desc');
let actualizarContador = document.getElementById('contadorCarrito');
let precioTotal = document.getElementById('precioTotal');

// funcion para agregar productos al carrito cuando se seleccionan 
function agregarProductosalCarrito(codigo){
    let verificar = carrito.find(prod=>prod.codigo==codigo);
    if(verificar){
// trabajo con tostify
        Toastify({
            text: "Producto agregado",
            close: true,
            position: "left",
            style: {
                background: "linear-gradient(to left, #00b09b, #96c93d)",
            }
        }).showToast();
        verificar.cantidad++;
        document.getElementById(`cant${verificar.codigo}`).innerHTML = `<p id="cant${verificar.codigo}">${verificar.cantidad}</p>`
        actualizarCarrito();
    }else{

        Toastify({
            text: "Producto agregado",
            className: "info",
            close: true,
            position: "left",
            close: true,
            position: "left",
            style: {
                background: "linear-gradient(to left, #00b09b, #96c93d)",
            }
        }).showToast();
        let productoAgregado = productos.find(item=> item.codigo == codigo);
        productoAgregado.cantidad = 1;

        //spread operator para sustituír el push
        carrito = [...carrito, productoAgregado];
        mostrarCarrito(productoAgregado);
        actualizarCarrito();        
    }
}    
    
function mostrarCarrito(productoAgregado) {
    //aplicar desestructuración 
    let {nombre, codigo, precio, cantidad}=productoAgregado;
    //modal dentro de listadoCarrito
    let div = document.createElement("div");
    div.className = 'elementoCarrito';
        //Definimos el innerHTML del elemento con una plantilla de texto
    div.innerHTML = `   <p>${nombre}</p>
                        <p id="precio${codigo}">$${precio}</p>
                        <p id="cant${codigo}">${cantidad}</p>
                        <button id="btn-eliminar${codigo}" class="botonEliminar"><span class="material-symbols-outlined">
                            delete
                            </span></button>  `;
    listadoCarrito.appendChild(div); 

    //eliminar productos del carrito        
    let btnEliminar = document.getElementById(`btn-eliminar${codigo}`);
    btnEliminar.addEventListener('click', ()=> {
        Toastify({
            text: "Producto eliminado",
            close: true,
            position: "left",
            style: {
                background: "linear-gradient(to left, #E55C31, #E59031)",
            }
        }).showToast();            
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
    btn.addEventListener("click", function () {

        let desc = Number(btn.value);
        console.log(btn.value);
        // agrego toFixed para dejar solo dos digitos despues de la coma
        precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+(el.precio*el.cantidad)*desc, 0).toFixed(2);
    });
    }
}
}
