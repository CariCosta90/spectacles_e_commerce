//creo una clase para generar una plantilla de objeto para los productos

class Producto {
    constructor (codigo, nombre, precio, descripcion, categoria, imagen){
        this.codigo=codigo;
        this.nombre=nombre;
        this.precio=precio;        
        this.descripcion=descripcion;
        this.categoria=categoria;
        this.imagen=imagen;
    }
    // agrego el teFixed para que queden solo 2 decimales al calcular el iva
    sumaIva(){
        this.precio=parseFloat(this.precio*1.22).toFixed(2);
    }
}
// agrego productos a un array 

let productos = [];
productos.push(new Producto(1,"Producto 1", 1500, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/s6.jpg'));
productos.push(new Producto(2,"Producto 2", 2700, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/sunglasses-on-yellow-beach-towel.png'));
productos.push(new Producto(3,"Producto 3", 2200, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/designed-sunglasses-on-the-red-book-and-grey-surface.png'));
productos.push(new Producto(4,"Producto 4", 3150, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/front-view-modern-dark-sunglasses-on-the-orange-black.png'));
productos.push(new Producto(5,"Producto 5", 2850, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de prescripcion", '../images/eyeglasses-wear.png'));
productos.push(new Producto(6,"Producto 6", 1700, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de prescripcion", '../images/optic-glasses-on-the-table.png'));
productos.push(new Producto(7,"Producto 7", 2200, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/m1.jpg'));
productos.push(new Producto(8,"Producto 8", 3700, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de prescripcion", '../images/m2.jpg'));
productos.push(new Producto(9,"Producto 9", 2450, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/m3.jpg'));
productos.push(new Producto(10,"Producto 10", 1500, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/m4.jpg'));
productos.push(new Producto(11,"Producto 11", 1900, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/s1.jpg'));
productos.push(new Producto(12,"Producto 12", 2490, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/s2.jpg'));
productos.push(new Producto(13,"Producto 13", 3200, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/s3.jpg'));
productos.push(new Producto(14,"Producto 14", 2300, "DESCRIPCIÓN: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, culpa.", "lentes de Sol", '../images/s4.jpg'));

// itero por el array aplicando el iva al precio de cada producto
for(const prod of productos){
    prod.sumaIva();
}    

// obtener nodo de productos:

const listadoProductos = document.getElementById('productos');

// creo la funcion para generar las cards en el HTML interactuando con el DOM - lo hago distinto a lo visto en clase complementaria para practicar. En vez de forEach uso For...of

function mostrarProductos(productos){
    // desestructuración     
    for (const prod of productos) {
        let {imagen, nombre, descripcion, precio, codigo}=prod;
        let contenedor = document.createElement("div");
        contenedor.className = 'card';
        contenedor.style='width: 18rem;';
        //Definimos el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<img src="${imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p class="card-title">${nombre}</p>
                                    <p class="card-text">${descripcion}</p>
                                    <p class="card-price">$${precio}</p>
                                    <a id="btnagregar${codigo}" class="btn btn-light agregarAlCarrito">Agregar al carrito</a>
                                </div>  `;
        listadoProductos.appendChild(contenedor);
        let botonSeleccionado = document.getElementById(`btnagregar${codigo}`);  
        botonSeleccionado.addEventListener('click', ()=> {agregarProductosalCarrito(codigo)
        });
    }
}

mostrarProductos(productos);

