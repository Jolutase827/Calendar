function getNumeroDiaPorMes(mes,año){
    switch (mes) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:    
            return 31;      
            break;  
        case 2:            
            return (isBisiesto(año))?29:28;
            break;
    
        default:
            return 30;
            break;
    }
}
function colocarMes(date){
    let dia = 1;
    let cambio=true;
    let restaOSuma;
    let dia1DelMes =new Date(date.getFullYear()+'-'+(date.getMonth()+1)+'-01');
    let posicionDia1 = dia1DelMes.getDay();
    
    let numeroDeDiasMes = getNumeroDiaPorMes(date.getMonth()+1,date.getFullYear());
    let numerosDiaMesPasado= getNumeroDiaPorMes(date.getMonth(),(date.getMonth()+1==1)?date.getFullYear()-1:date.getFullYear());
    localStorage.removeItem('elemento-seleccionado');
    let resta = (posicionDia1==0)?5:posicionDia1-2;
    textoMesYAnyo.textContent = mesesNombre[date.getMonth()]+" "+date.getFullYear();
    numeros.forEach(numero => {
        if(posicionDia1!=1&&resta>=0){
             numero.innerHTML = '<strong>'+(numerosDiaMesPasado-resta--)+'</strong>';
             numero.classList="otro-mes";
             restaOSuma = 0;
        }else
            if(dia<=numeroDeDiasMes){
                numero.innerHTML ='<strong>'+(dia++)+'</strong>';

                if(!cambio){
                    numero.classList="otro-mes";
                }else{
                    numero.classList="";
                    restaOSuma = 1;
                }
            }
            else{
                dia = 1;
                numero.innerHTML ='<strong>'+(dia++)+'</strong>';
                numero.classList="otro-mes";
                cambio=false;
                restaOSuma = 2;
            }
            let fecha =  date.getFullYear()+'-'+(((date.getMonth()<10)?'0':'')+(date.getMonth()+restaOSuma))+'-'+((restaOSuma==0)?numerosDiaMesPasado-(resta+1):((dia/10<1)?'0'+(dia-1):dia-1));
            if(fecha==fechaDiaHoy){
                numero.classList+= ' dia-hoy';
            }
            if(allTareas.filter(element=> element.fecha==fecha&&nombreUsuario==element.nombreUsuario).length>0){
                numero.classList+= ' tiene-tarea';
            }
            numero.id = fecha;
    });
}

 function colocarEventsListeners(numeros){
    numeros.forEach(element => {
        ponerEventListener(element);
    });
 }

function ponerEventListener(elemento){    
    elemento.addEventListener('click',()=>{
        let idElemento= elemento.id;
        if(parseInt(idElemento.substr(5,2))>date.getMonth()+1){
            date.setMonth(date.getMonth()+1);
            colocarMes(date);
        }else if(parseInt(idElemento.substr(5,2))<date.getMonth()+1){
            date.setMonth(date.getMonth()-1);
            colocarMes(date);
        }else if(localStorage.getItem('elemento-seleccionado')!=null){
            let idElementoAnterior = JSON.parse(localStorage.getItem('elemento-seleccionado'));
            if(idElementoAnterior.substr(5,2)==date.getMonth()+1){
                if(allTareas.filter(element=> element.fecha==idElementoAnterior&&nombreUsuario==element.nombreUsuario).length>0)
                    document.getElementById(idElementoAnterior).classList='tiene-tarea';        
                else
                    document.getElementById(idElementoAnterior).classList='';
                if(idElementoAnterior==fechaDiaHoy)
                    document.getElementById(idElementoAnterior).classList+=' dia-hoy';        
            }
        }
        document.getElementById(idElemento).classList ="seleccionado";
        localStorage.setItem('elemento-seleccionado',JSON.stringify(idElemento));
        establecerTareas(idElemento);
    });
}
function establecerTareas(idElemento){
    bloqueTareas.innerHTML=`<div class="col-12 row">
    <h1 class="col-6 ms-3 mb-0">Tareas</h1>
    <strong class="col-5 ms-3 text-end azul fechaTareas">${parseInt(idElemento.substr(8))+ ' de '+mesesNombre[parseInt(idElemento.substr(5,2))-1]+ ' de '+ date.getFullYear()}</strong>
</div>
<div class="contenedor-tareas mt-4" id='contenedorTareas'>
    
</div>
<div class="col-12 d-flex justify-content-around mt-3 mb-3">
    <input type="text" id="tareaAnyadir" placeholder="Escribe tarea" class="col-7 rounded">
    <button class="btn btn-primary col-4" id='anyadir-tarea'>Crear tarea</button>
</div>`;
    
    let tareas = allTareas.filter(tarea => tarea.fecha== idElemento && tarea.nombreUsuario== nombreUsuario);
    if(tareas.length>0){
        document.getElementById('contenedorTareas').innerHTML='';
        tareas.forEach(element => {
            anyadirElemnto(element.idTarea,element.nombreTarea,document.getElementById('contenedorTareas'),allTareas);
        });

    }else{
        document.getElementById('contenedorTareas').innerHTML='<h3 class="col-12 text-center">No hay tareas este día </h3>';
    }
    document.getElementById('anyadir-tarea').addEventListener('click',()=>{
        let inputTarea = document.getElementById('tareaAnyadir');
        if(inputTarea.value==''){
            alert('Porfavor para añadir una tarea escriba lo que quiere anyadir');
        }else{
            if(tareas.length<1){
                document.getElementById('contenedorTareas').innerHTML='';
                anyadirElemnto(allTareas.length,inputTarea.value,document.getElementById('contenedorTareas'),allTareas);
            }else{
                anyadirElemnto(allTareas.length,inputTarea.value,document.getElementById('contenedorTareas'),allTareas);
            }
            allTareas.push({idTarea: allTareas.length,nombreTarea: inputTarea.value, nombreUsuario: nombreUsuario,fecha:idElemento});
            tareas.push({idTarea: allTareas.length,nombreTarea: inputTarea.value, nombreUsuario: nombreUsuario,fecha:idElemento});
            localStorage.setItem('tareas',JSON.stringify(allTareas));
        }
    })

}

function anyadirElemnto(idTarea,nombreTarea,padre){
    const contenedorTarea = document.createElement('div');
    const h3 =document.createElement('h3');
    const i = document.createElement('i');
    contenedorTarea.classList = "tarea d-flex justify-content-around align-items-center rounded mb-3";
    h3.classList = 'col-7';
    h3.textContent = nombreTarea;
    i.classList = "bi bi-trash3 rounded";
    i.addEventListener('click',()=>{
        allTareas = allTareas.filter(tarea => tarea.idTarea!=idTarea);
        contenedorTarea.remove();
        localStorage.setItem('tareas',JSON.stringify(allTareas));
    });
    contenedorTarea.append(h3);
    contenedorTarea.append(i);
    padre.append(contenedorTarea);
}

function isBisiesto(año){
    if(año%4==0){
        if(año%100==0){
            if(año%400==0){
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}