const nombre = document.getElementById('nombreUsuario');
const boton = document.getElementById('boton');
const contrasenya = document.getElementById('contrasenya');
let usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
let existeUsuario = false;
boton.addEventListener('click', () => {
    if (nombre.value==''||contrasenya.value=='') {
        alert('Rellena todos los campos');     
    }else{
        if (usuarios == null) {
            alert('El usuario o la contrasenya son erroneas');
        } else {
            usuarios.forEach(element => {
                if (element.nombre == nombre.value && element.contrasenya == contrasenya.value) {
                    existeUsuario = true;
                }
            });
            if(existeUsuario){
                sessionStorage.setItem('usuarioActivo',nombre.value);
                location.replace('index.html');
            }else{
                alert('El usuario o la contrasenya son erroneas');
            }
        }
    }
});