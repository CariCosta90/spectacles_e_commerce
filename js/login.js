class Usuario{
    constructor(correo, pass){
        this.correo=correo;
        this.pass=pass;
    }
}
const usuariosRegistrados = [];

let btnRegistrar = document.getElementById("btnRegistrar");
btnRegistrar.addEventListener('click', function(){
    //alert("funciona");
    let emailIngresado = document.getElementById("email").value;
    //alert (emailIngresado);
    let passIngresada = document.getElementById("pass").value;
    //alert(passIngresada);
    let existe;
    // validar mail no registrado
    // let existe = usuariosRegistrados.find(element => element.correo == emailIngresado);
    if(usuariosRegistrados.length>0){
        if(existe = usuariosRegistrados.find(element => element.correo == emailIngresado)){
            alert('ya existe un usuario registrado con ese correo');    
        }else{
            usuariosRegistrados.push(new Usuario(emailIngresado,passIngresada));    
            GuardarUsuarios();        }
    }else{
        usuariosRegistrados.push(new Usuario(emailIngresado,passIngresada));    
        GuardarUsuarios();
    }
});

let usuariosGuardados;
let usuariosRecuperados;

function GuardarUsuarios(){
        usuariosGuardados = JSON.stringify(usuariosRegistrados);
        localStorage.setItem('Lista de usuarios', usuariosGuardados);
        alert('el usuario se ha guardado correctamente');    
}
// alert('el usuario se ha guardado correctamente'); 

function RecuperarUsuarios() {
    //usuariosRecuperados = JSON.parse(usuariosGuardados);
    //cambio esta linea porque no funcionaba si el usuario no se habia guardado en el mismo momento
    usuariosRecuperados = JSON.parse(localStorage.getItem('Lista de usuarios'));
    console.log(usuariosRecuperados);
    console.log(usuariosGuardados);
}

let btnLoguear = document.getElementById('btnLogin');
btnLoguear.addEventListener('click', function () {
    let emailUsuarioLogin = document.getElementById('email').value;
    let passUsuarioLogin = document.getElementById('pass').value;
    RecuperarUsuarios();

    //esto me recorria el array y me tiraba las respuestas por cada recorrido, ej primero no existe (no es objeto1), despues existe (es objeto2).
/*     usuariosRecuperados.forEach(element => {
        if(emailUsuarioLogin == element.correo && passUsuarioLogin==element.pass){
            alert('existe usuario');
        }else if (emailUsuarioLogin != element.correo){
            alert('el correo ingresado no es correcto');
        }else if(emailUsuarioLogin == element.correo && passUsuarioLogin != element.pass){
            alert('contrasena incorrecta');
        }else{
            alert('no existe usuario, debes registrarte');
        }
    }); */

    let encontrarUsuario = usuariosRecuperados.find(element => element.correo == emailUsuarioLogin);
    if(encontrarUsuario){
        if(encontrarUsuario.pass == passUsuarioLogin){
            alert('ingresa')
            // window.location.assign("");
            window.location.replace('../pages/store.html');
        }else{
            alert('pass incorrecta');
        }
    }else{
        alert('usuario no existe, debes registrarte');
    }    
});

/* Posibles mejoras:
1. borrar los campos input despues de crear un usuario *hecho*
3. no poder crear usuario con mismo mail mas de 1 vez *hecho* 
2. redirigir a la store cuando se ingrese exitosamente *hecho*
1. revisar y aplicar la mejora de codigo que me paso Emiliano *hecho*


4. limitantes en la pass, ej cantidad de caracteres, caracteres especiales
5. que el mail sea un mail
*/

// comentario de prueba