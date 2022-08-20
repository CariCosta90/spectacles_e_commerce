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
    usuariosRegistrados.push(new Usuario(emailIngresado,passIngresada));    
    GuardarUsuarios();
});

let usuariosGuardados;
let usuariosRecuperados;

function GuardarUsuarios(){
    usuariosGuardados = JSON.stringify(usuariosRegistrados);
    localStorage.setItem('Lista de usuarios', usuariosGuardados);
    alert('el usuario se ha guardado correctamente');
}

function RecuperarUsuarios() {
    usuariosRecuperados = JSON.parse(usuariosGuardados);
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
        }else{
            alert('pass incorrecta');
        }
    }else{
        alert('usuario no existe, debes registrarte');
    }    
});

