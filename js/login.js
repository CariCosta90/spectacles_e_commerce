//clase para generar los usuarios
class Usuario{
    constructor(correo, pass){
        this.correo=correo;
        this.pass=pass;
    }
}
let usuariosRegistrados = [];

let informacionLogin = document.getElementById("info");

//informacion sobre contraseña 
informacionLogin.innerHTML = `  <b>La contraseña debe contener:</b> 
                                <li>Minimo 8 caracteres</li>
                                <li>Un número</li>
                                <li>Una letra mayúscula</li>
                                <li>Una letra minúscula</li>
                                <li>Un caracter especial</li>`

//registrar un usuario nuevo                                
let btnRegistrar = document.getElementById("btnRegistrar");
btnRegistrar.addEventListener('click', function(e){
    e.preventDefault();
    let emailIngresado = document.getElementById("email").value;
    let passIngresada = document.getElementById("pass");
    let existe;
    let regularExpression  = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

//alertas con Sweet Alert
    if(regularExpression.test(passIngresada.value) && emailIngresado != ""){
        if(usuariosRegistrados.length>0){
            if(existe = usuariosRegistrados.find(element => element.correo == emailIngresado)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ya existe un usuario registrado con ese correo!',
                    })
            }else{
                usuariosRegistrados.push(new Usuario(emailIngresado,passIngresada.value));    
                    GuardarUsuarios();
                    emailIngresado.value =''
                    passIngresada.value=''
                }
        }else{
            usuariosRegistrados.push(new Usuario(emailIngresado,passIngresada.value));    
            GuardarUsuarios();
            emailIngresado.value =''
            passIngresada.value=''
        }
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'La contraseaña no respeta el formato o no ingresó un email valido!',
            })
    }
});

let usuariosGuardados;
let usuariosRecuperados;

//guardar usuarios
function GuardarUsuarios(){
        usuariosGuardados = JSON.stringify(usuariosRegistrados);
        localStorage.setItem('Lista de usuarios', usuariosGuardados);
        Swal.fire({
            icon: 'success',
            title: 'Genial!',
            text: 'El usuario se ha guardado correctamente!',
            })
}

//recuperar usuarios
function RecuperarUsuarios() {

    usuariosRecuperados = JSON.parse(localStorage.getItem('Lista de usuarios'));
    usuariosRegistrados = [...usuariosRecuperados];
}
RecuperarUsuarios();

let btnLoguear = document.getElementById('btnLogin'); 
btnLoguear.addEventListener('click', function (e) {
    e.preventDefault();
    let emailUsuarioLogin = document.getElementById('email').value;
    let passUsuarioLogin = document.getElementById('pass').value;
    RecuperarUsuarios();


let encontrarUsuario = usuariosRecuperados.find(element => element.correo == emailUsuarioLogin);

// anido un operador ternario dentro de otro
// redireccion a página con datos correctos, mensaje de error con datos incorrectos

encontrarUsuario  ? (encontrarUsuario.pass == passUsuarioLogin  ?  window.location.replace('../pages/store.html')  :  

Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Contraseña incorrecta!',
    })
) : 

Swal.fire({
    icon: 'info',
    title: 'Oops...',
    text: 'Usuario no existe, debes registrarte!',
    })

});


