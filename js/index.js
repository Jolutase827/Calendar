if(sessionStorage.getItem('usuarioActivo')==null)
    location.replace('singup.html');

const nombreUsuario = sessionStorage.getItem('usuarioActivo');
const numeros = document.querySelectorAll('td');
const sumarmes = document.getElementById('mesmas'); 
const restarmes = document.getElementById('mesmenos'); 
const textoMesYAnyo = document.getElementById('mesyanyo');
const mesesNombre = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const bloqueTareas= document.getElementById('bloque-tarea');
let date = new Date();
if(localStorage.getItem('tareas')==null){
    localStorage.setItem('tareas',JSON.stringify([]));
}
let allTareas = JSON.parse(localStorage.getItem('tareas')); 
colocarMes(date);
sumarmes.addEventListener('click',()=>{
    date.setMonth(date.getMonth()+1);
    colocarMes(date);
});
restarmes.addEventListener('click',()=>{
    date.setMonth(date.getMonth()-1);
    colocarMes(date);
});
colocarEventsListeners(numeros);