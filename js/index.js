if(sessionStorage.getItem('usuarioActivo')==null)
    location.replace('singup.html');

const nombreUsuario = sessionStorage.getItem('usuarioActivo');
const numeros = document.querySelectorAll('td');
const sumarmes = document.getElementById('mesmas'); 
const restarmes = document.getElementById('mesmenos'); 
const textoMesYAnyo = document.getElementById('mesyanyo');
const mesesNombre = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const bloqueTareas= document.getElementById('bloque-tarea');
const inputBuscador = document.getElementById('buscador');
const botonBuscador = document.getElementById('boton-buscador');
const contenedorTareasABuscar = document.getElementById('contendor-informacion');
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
document.addEventListener('click',()=>{
    contenedorTareasABuscar.innerHTML='';
});
inputBuscador.addEventListener('keyup',()=>{
    let hayTarea = false;
    contenedorTareasABuscar.innerHTML='';
    allTareas.filter(element=> element.nombreTarea.includes(inputBuscador.value)&&nombreUsuario==element.nombreUsuario).forEach(tarea => {
        hayTarea=true;
        contenedorTareasABuscar.innerHTML+=`<div class="col-12 d-flex justify-content-around pt-2 pb-2 contedor-tarea-buscador" id='${tarea.idTarea+'bus'}'>
        <span>${tarea.nombreTarea}</span>
        <span>${tarea.fecha}</span>
    </div>`;
    });
    allTareas.filter(element=> element.nombreTarea.includes(inputBuscador.value)&&nombreUsuario==element.nombreUsuario).forEach(tarea => {
        document.getElementById(tarea.idTarea+'bus').addEventListener('click',()=>{
            contenedorTareasABuscar.innerHTML='';
            inputBuscador.value = tarea.nombreTarea;
            inputBuscador.name = tarea.idTarea;
        });
    });
    inputBuscador.name = '';
    if(!hayTarea){
        contenedorTareasABuscar.innerHTML+=`<div class="col-12 d-flex justify-content-around pt-2 pb-2">
        <span>No existen tareas con este nombre.</span>
    </div>`;
    }
});
botonBuscador.addEventListener('click',()=>{
    if(inputBuscador.name!=''){
        let buscador = allTareas.filter(element=> element.idTarea==inputBuscador.name&&nombreUsuario==element.nombreUsuario);
        if(buscador.length>0){
            date = new Date(buscador[0].fecha);
            colocarMes(date);
            document.getElementById(buscador[0].fecha).click();
        }else{
            alert('No existe tarea');
        }
    }else{
        let buscador = allTareas.filter(element=> element.nombreTarea==inputBuscador.value&&nombreUsuario==element.nombreUsuario);
        if(buscador.length>0){
            date = new Date(buscador[0].fecha);
            colocarMes(date);
            document.getElementById(buscador[0].fecha).click();
        }else{
            alert('No existe tarea');
        }
    }
});
