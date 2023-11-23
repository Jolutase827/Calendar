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
        numero.id = date.getFullYear()+'-'+(date.getMonth()+restaOSuma)+'-'+((restaOSuma==0)?numerosDiaMesPasado-(resta+1):((dia/10<1)?'0'+(dia-1):dia-1));
        ponerEventListener(numero,date.getFullYear()+'-'+(date.getMonth()+restaOSuma)+'-'+((restaOSuma==0)?numerosDiaMesPasado-(resta+1):((dia/10<1)?'0'+(dia-1):dia-1)));
            
    });
    localStorage.removeItem('elemento-seleccionado');
}

function ponerEventListener(elemento,fecha){
    elemento.addEventListener('click',()=>{
        if(localStorage.getItem('elemento-seleccionado')!=null){
            let idElementoAnterior = JSON.parse(localStorage.getItem('elemento-seleccionado'));
            if(idElementoAnterior.substr(5,2)==fecha.substr(5,2))
                document.getElementById(idElementoAnterior).classList='';
            else
                document.getElementById(idElementoAnterior).classList='otro-mes';
        }
        elemento.classList ="seleccionado";
        localStorage.setItem('elemento-seleccionado',JSON.stringify(fecha));
    });
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