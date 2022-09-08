
let carrito = [];
const listadoCarrito = document.getElementById('elementos');
const listadoPromos = document.getElementById('desc');
let actualizarContador = document.getElementById('contadorCarrito');
let precioTotal = document.getElementById('precioTotal');
let desc;

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
                        <p id="precio${codigo}">$ ${parseFloat(precio)}</p>
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

    for (const btn of btns){
    btn.addEventListener("click", function () {

        let desc = Number(btn.value);
        console.log(btn.value);
        //forEach para popular parametro "prodDesc" con precio del producto con descuento aplicado
        carrito.forEach(element => {
            element.prodDesc = (parseFloat(element.precio*desc));
            console.log(element.prodDesc);
        });
        // agrego toFixed para dejar solo dos digitos despues de la coma
        precioTotal.innerHTML = carrito.reduce((acc,el)=> acc+(el.precio*el.cantidad)*desc, 0).toFixed(2);
    });
    }
}


//integracion con API de MercadoPago
const pagar = async () =>{
    const productosToMap = carrito.map(element =>{
        let nuevoElemento=
        {
            title: element.nombre,
            description: "",
            picture_url: "",
            category_id: "",
            quantity: parseInt(element.cantidad),
            currency_id: "UYU",
            unit_price: element.prodDesc
        }
        return nuevoElemento;
    })
    let response = await fetch ("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
            Authorization: "Bearer TEST-3922510733928552-090619-611e4104ebcfea53ae9c5ed178e2abd2-89995881"
        },
        body: JSON.stringify({
            items: productosToMap
        })
    });

    let data = await response.json();
    console.log(data);
    window.open(data.init_point, "_blank")
}


