class Usuario{
    constructor(correo, pass){
        this.correo=correo;
        this.pass=pass;
    }
}
const usuariosRegistrados = [];

let informacionLogin = document.getElementById("info");

informacionLogin.innerHTML = `  <b>La contraseña debe contener:</b> 
                                <li>Minimo 8 caracteres </li>
                                <li>Un número </li>
                                <li>Una letra mayúscula</li>
                                <li>Una letra minúscula</li>
                                <li>Un caracter especial</li>`

let btnRegistrar = document.getElementById("btnRegistrar");
btnRegistrar.addEventListener('click', function(e){
    e.preventDefault();
    let emailIngresado = document.getElementById("email").value;
    let passIngresada = document.getElementById("pass");
    let existe;
    let regularExpression  = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    console.log(regularExpression.test(passIngresada.value));
    if(regularExpression.test(passIngresada.value) && emailIngresado != ""){
        if(usuariosRegistrados.length>0){
            if(existe = usuariosRegistrados.find(element => element.correo == emailIngresado)){
                informacionLogin.innerHTML = `Ya existe un usuario registrado con ese correo`;
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
        informacionLogin.innerHTML =`La contraseaña no respeta el formato o no ingresó email`;
    }
});

let usuariosGuardados;
let usuariosRecuperados;

function GuardarUsuarios(){
        usuariosGuardados = JSON.stringify(usuariosRegistrados);
        localStorage.setItem('Lista de usuarios', usuariosGuardados);
        informacionLogin.innerHTML =`El usuario se ha guardado correctamente`;
}


function RecuperarUsuarios() {

    usuariosRecuperados = JSON.parse(localStorage.getItem('Lista de usuarios'));
    console.log(usuariosRecuperados);
    console.log(usuariosGuardados);
}

let btnLoguear = document.getElementById('btnLogin');
btnLoguear.addEventListener('click', function (e) {
    e.preventDefault();
    let emailUsuarioLogin = document.getElementById('email').value;
    let passUsuarioLogin = document.getElementById('pass').value;
    RecuperarUsuarios();


let encontrarUsuario = usuariosRecuperados.find(element => element.correo == emailUsuarioLogin);
    if(encontrarUsuario){
        if(encontrarUsuario.pass == passUsuarioLogin){
            window.location.replace('../pages/store.html');
        }else{
            informacionLogin.innerHTML =`Contraseña incorrecta`;
        }
    }else{
        informacionLogin.innerHTML =`Usuario no existe, debes registrarte`;
    }    
});
