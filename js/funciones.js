//creo una clase para generar una plantilla de objeto para los productos

class Producto {
    constructor (codigo, nombre, precio){
        this.codigo=codigo;
        this.nombre=nombre;
        this.precio=precio;        
    }
    sumaIva(){
        this.precio=this.precio*1.22;
    }
}
// agrego productos a un array, utilizo la misma informacion aplicada en el simulador, al agregar al proyecto implementare nombres de productos mas descriptivos
const productos = [];
productos.push(new Producto(1,"Producto 1 ", 100));
productos.push(new Producto(2,"Producto 2", 120));
productos.push(new Producto(3, "Producto 3", 500));
productos.push(new Producto(4, "Producto 4", 350));
productos.push(new Producto(5,"Producto 5", 260));

// itero por el array aplicando el iva al precio de cada producto
for(const prod of productos){
    prod.sumaIva();
}
// console log para verificar el cambio en el precio de los productos posterior a la suma del iva
console.log(productos);

//creo una clase para generar una plantilla de objeto para los descuentos
class Descuentos{
    constructor (codigo, nombre, porcentaje){
        this.codigo=codigo;
        this.nombre=nombre;
        this.porcentaje=porcentaje;
    }
}
//agrego descuentos al array
const descuento = [];
descuento.push(new Descuentos(1, "Descuento del dia del nino", 15));
descuento.push(new Descuentos(2, "Descuento por convenio con empresa", 20));
descuento.push(new Descuentos(3, "Descuento por tarjeta de credito", 25));

// genero funcion para el promt para que el usuario pueda seleccionar el producto
const seleccion = () => {
    let mensaje = "Selecciona los productos: "
    productos.forEach(articulo => {
        mensaje += `
        Opcion ${articulo.codigo}: ${articulo.nombre} - Precio: $${articulo.precio}`
    })
    mensaje += `
        Opcion 0: No comprar nada - ir al carrito`
    let opcion = Number(prompt(mensaje));
    return opcion;
}

// genero funcion para el promt para que el usuario pueda seleccionar el descuento
const desc =()=> {
    let mensaje = "selecciona un descuento: "
    descuento.forEach(element => {
        mensaje += `
        Opcion ${element.codigo}: ${element.nombre} - Porcentaje: %${element.porcentaje}
        `        
    });
    mensaje+=`
        Opcion 0: No tengo descuento`
    let opcion = Number(prompt(mensaje));
    return opcion;
}

let carrito = [];
let comprar=true;
let promo = 0;

//while para evaluar selecciones hechas por el usuario y sumar la informacion al carrito
while (comprar) {
    let opcion = seleccion();
    if (opcion>=1 && opcion<=5) {
        let productoSeleccionado = productos.find(articulo => articulo.codigo === opcion);
        if(carrito.length === 0){
            productoSeleccionado.cantidad = 1;
            carrito.push(productoSeleccionado);
        }else{
            let prodEnCarrito = carrito.find(articulo => articulo.codigo === opcion);
            if(prodEnCarrito){
                prodEnCarrito.cantidad++;
            }else{
                productoSeleccionado.cantidad = 1;
                carrito.push(productoSeleccionado);
            }
        }
    } else {
        comprar=false;
        // update de la variable promo con la seleccion del descuento para el calculo del total del carrito
        let opcion = desc();
        if(opcion>=1 && opcion<=3){
            let descuentoSeleccionado = descuento.find(articulo => articulo.codigo === opcion);
            promo = descuentoSeleccionado.porcentaje;
        }        
    }    
}
console.log(promo);

//mostrar el resumen del carrito - productos seleccionados, descuento, total. 

const mostrarTotalCarrito = () => {
    let mensajeCarrito = "";
    if(carrito.length>0){
        carrito.forEach(prod => {
            mensajeCarrito += `
                Producto: ${prod.nombre} - Cantidad: ${prod.cantidad} - Total: $${prod.cantidad*prod.precio} \n
            `
        })
        mensajeCarrito += `    Descuentos aplicados: % ${promo} \n
            Total Carrito:  $${carrito.reduce((total, prod)=>total+((prod.precio*prod.cantidad) - ((prod.precio*prod.cantidad)*(promo/100)) ),0)}`
        alert(mensajeCarrito);
    }else{
        mensajeCarrito += `No hay productos en el carrito`;
        alert(mensajeCarrito);
    }
}
mostrarTotalCarrito();
