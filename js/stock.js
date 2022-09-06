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
    // agrego el toFixed para que queden solo 2 decimales al calcular el iva
    sumaIva(){
        this.precio=parseFloat(this.precio*1.22).toFixed(2);
    }
}

let productos = [];
//implemento funcion async para hacer fetch de json con listado de productos. 
const traerProductosJson = async () => {
    let response = await fetch ("../productos.json");
    let data = await response.json();

    data.forEach(el => {
        let codigo = el.codigo;
        let nombre = el.nombre;
        let precio = el.precio;
        let descripcion = el.descripcion;
        let categoria = el.categoria;
        let imagen = el.imagen;

        productos.push(new Producto (codigo, nombre, precio, descripcion, categoria, imagen));
    });
        // itero por el array aplicando el iva al precio de cada producto
        for(const prod of productos){
            prod.sumaIva();
        }
    mostrarProductos(productos);
}

traerProductosJson();   

// obtener nodo de productos:

const listadoProductos = document.getElementById('productos');

// creo la funcion para generar las cards en el HTML interactuando con el DOM 
//Productos inHouse --> directos del stock del local
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

//productos por encargo, traidos de la api de MercadoLibre

let prodsMercadoLibre;

const traerProductosMercadoLibre = async () => {
    //traigo listado de Lentes filtrados por categoría 
    let resp = await fetch ("https://api.mercadolibre.com/sites/MLU/search?q=Lentes&category=MLU158429");
    let data = await resp.json();
    prodsMercadoLibre = data.results;

    const listadoProductos2 = document.getElementById('porEncargo');
    prodsMercadoLibre.forEach(element => {
        let contenedor2 = document.createElement("div");
        contenedor2.className = 'card2';
        contenedor2.style='width: 12rem;';
        contenedor2.innerHTML = `<img src="${element.thumbnail}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <p class="card-title">${element.title}</p>
                                <p class="card-price">$${element.price}</p>
                                <a id="btnagregar${element.id}" class="btn btn-light agregarAlCarrito">Agregar al carrito</a>
                                </div>  `;       
        listadoProductos2.appendChild(contenedor2);
        let botonSeleccionado = document.getElementById(`btnagregar${element.id}`);
        botonSeleccionado.addEventListener('click', ()=> {
            productos.push(new Producto (element.id, element.title, element.price, element.title, element.title, element.thumbnail));
            agregarProductosalCarrito(element.id)})
    });
}
traerProductosMercadoLibre();