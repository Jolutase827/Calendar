const nombre = document.getElementById('nombreUsuario');
const pwd = document.getElementById('contrasenya');
const rpwd = document.getElementById('rcontrasenya');
const boton = document.getElementById('boton');
let existeUsuario = false;
let usuarios;
if(sessionStorage.getItem('usuarios')==null)
    usuarios =[];
else
    usuarios = JSON.parse(sessionStorage.getItem('usuarios'));

boton.addEventListener('click',()=>{
    if(nombre.value==''||pwd.value==''||rpwd==''){
        alert('Rellena todos los campos');
    }else if(pwd.value!=rpwd.value){
        alert('Las contraseñas no coinciden');
    }else {
        usuarios.forEach(element => {
            if(element['nombre']==nombre.value)
                existeUsuario=true;
        });
        if(existeUsuario){
            alert('El nombre de usuario no esta disponible');
            existeUsuario=false;
        }else{
            usuarios.push({nombre: nombre.value, contrasenya:  pwd.value});
            sessionStorage.setItem('usuarios',JSON.stringify(usuarios));
            sessionStorage.setItem('usuarioActivo',nombre.value);
            location.replace('index.html');
        }
    }
});