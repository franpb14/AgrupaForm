var nc=0;
var listaColores=["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 160, 5)", "rgb(0, 205, 86)","#FF7F50",
                "#8B0000","#DA70D6","#4B0082","#8FBC8F","#7FFFD4","#D2691E"]
function dibujaGrafico(pregunta, tablas, estados){
    var list = document.getElementsByTagName("tr");
    let nrespuestas =0;
    let posibilidades=obtenPosibilidadesRespuestas(pregunta);
    document.getElementById("generador").innerHTML='<canvas style="opacity:1;z-index:9999;" id="myChart'+nc+'"></canvas>'
    let cantidadDeCadaRespuesta = inicializaCantidades(posibilidades);
    for (let i = 3; i < list.length; i++) {
        if(cumpleEstados(estados,tablas,list[i].getElementsByTagName("td"))){
            var respuestafinal=list[i].getElementsByTagName("td")[pregunta].innerText;
            nrespuestas+=1
            cantidadDeCadaRespuesta[posibilidades.indexOf(respuestafinal)]=cantidadDeCadaRespuesta[posibilidades.indexOf(respuestafinal)]+1;
        }
    
    }
    
    let porcentajeDeCadaRespuesta = calculaPorcentajeTotales(nrespuestas,cantidadDeCadaRespuesta);
    
    document.getElementById("numTotalesRespuestas").innerHTML="<strong>Número total de respuestas: </strong>"+nrespuestas
    nc+1;
    document.getElementById("tituloPregunta").innerText=list[1].getElementsByTagName("td")[pregunta].innerText
    escribeProbabilidades(porcentajeDeCadaRespuesta,cantidadDeCadaRespuesta, posibilidades);
    var ctx = document.getElementById('myChart'+nc).getContext('2d');
    var chart = new Chart(ctx,{
        "type":"pie",
        "options":{
            "legend": { "display": false } 
            
     },
        "data":{
            "labels":posibilidades,
            
            "datasets":[
                {"label":"My First Dataset",
                "data":porcentajeDeCadaRespuesta,
                "backgroundColor":listaColores
                }]}});
            
}
function dibujaGraficoMultiRespuesta(pregunta, tablas, estados){
    var list = document.getElementsByTagName("tr");
    let nrespuestas =0;
    let posibilidades=obtenPosibilidadesMultiRespuestas(pregunta);
    document.getElementById("generador").innerHTML='<canvas style="opacity:1;z-index:9999;" id="myChart'+nc+'"></canvas>'
    let cantidadDeCadaRespuesta = inicializaCantidades(posibilidades);
    for (let i = 3; i < list.length; i++) {
        if(cumpleEstados(estados,tablas,list[i].getElementsByTagName("td"))){
            var respuestafinal=list[i].getElementsByTagName("td")[pregunta].innerText;
            let splitearRespuesta = respuestafinal.split(",")
            splitearRespuesta.forEach(element => {
                cantidadDeCadaRespuesta[posibilidades.indexOf(element.trim())]=cantidadDeCadaRespuesta[posibilidades.indexOf(element.trim())]+1;

            });
            nrespuestas+=1
            }
    
    }
    
    let porcentajeDeCadaRespuesta = calculaPorcentajeTotales(nrespuestas,cantidadDeCadaRespuesta);
    
    document.getElementById("numTotalesRespuestas").innerHTML="<strong>Número total de respuestas: </strong>"+nrespuestas
    nc+1;
    document.getElementById("tituloPregunta").innerText=list[1].getElementsByTagName("td")[pregunta].innerText
    escribeProbabilidades(porcentajeDeCadaRespuesta,cantidadDeCadaRespuesta, posibilidades);
    var ctx = document.getElementById('myChart'+nc).getContext('2d');
    var chart = new Chart(ctx,{
        "type":"bar",
        "options":{
            "legend": { "display": false } 
            
     },
        "data":{
            "labels":posibilidades,
            
            "datasets":[
                {"label":"My First Dataset",
                "data":porcentajeDeCadaRespuesta,
                "backgroundColor":listaColores
                }]}});
            
}
function escribeProbabilidades(porcentajes, numeros, posibilidades){
    let escribeRespuestas = document.getElementById("escribeRespuestas");
    escribeRespuestas.innerHTML=""
    for(let i = 0; i<porcentajes.length;i++){
        if(i==porcentajes.length-1){
            escribeRespuestas.innerHTML+="<span style='color:"+listaColores[i]+"'>"+posibilidades[i]+": "+"<strong>"+porcentajes[i].toFixed(1)+"% ("+numeros[i]+")</strong> </span>  ";

        }else {
            escribeRespuestas.innerHTML+="<span style='color:"+listaColores[i]+"'>"+posibilidades[i]+": "+"<strong>"+porcentajes[i].toFixed(1)+"% ("+numeros[i]+")</strong> </span> / ";

        }
    }
}

function cumpleEstados(states, tables, tds){
    let boleano=true;
    tables.forEach(e => {
        
        if((tds[parseInt(e)].innerText==states[tables.indexOf(e)+1] || states[tables.indexOf(e)+1]=="Todos")&&boleano){
            boleano=true;
        }else{
            boleano=false;
        }
          });
    return boleano;
}
function inicializaCantidades(posibilidades){
    res=[]
    for(i=0;i<posibilidades.length;i++){
        res.push(0)
    }
    return res;

}
function calculaPorcentajeTotales(tam, resultado){
    let porcentajes=[];
    resultado.forEach(e => {
        porcentajes.push((e/tam)*100)
        
    });
    return porcentajes;
}
function obtenPosibilidadesRespuestas(pregunta){
    let lista=[]
    let trs = document.getElementsByTagName("tr");
        for (let index = 3; index < trs.length; index++) {
            let grupo = trs[index].getElementsByTagName("td")[parseInt(pregunta)].innerText;
            if(!lista.includes(grupo)){
                if(grupo!=""){
                    lista.push(grupo);
                }else if(!lista.includes("No ha contestado")){
                    lista.push("No ha contestado")
                }
            }
        }
    return lista;
}
function obtenPosibilidadesMultiRespuestas(pregunta){
    let lista=[]
    let trs = document.getElementsByTagName("tr");
        for (let index = 3; index < trs.length; index++) {
            let grupo = trs[index].getElementsByTagName("td")[parseInt(pregunta)].innerText;
            let splitearRespuesta = grupo.split(",")
            splitearRespuesta.forEach(element => {
                if(!lista.includes(element.trim())){
                    lista.push(element.trim());
                }
            });
            
        }
    return lista;
}