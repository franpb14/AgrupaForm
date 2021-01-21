    function devuelveOpciones(lista){
        text =`<option selected>Todos</option>`;
        lista.forEach(el=>{
            text +=`<option>${el}</option>`;
            })
       return text;
    }
var npregunta;      
    document.getElementById("agrupar").onclick=()=>{
        let numDesplegable=1;
        let trs = document.getElementById("tabla").getElementsByTagName("tr");
        radios = document.getElementsByClassName("radios")
        var tablas = []
        for(let i=0;i< radios.length;i++){
            if(radios[i].checked && i%2==0){
                tablas.push(radios[i].id.split("-")[1])
            }
        }
        let desplegables = document.getElementById("desplegables")
        tablas.forEach(e => {
            let lista=[]
            for (let index = 3; index < trs.length; index++) {
                let grupo = trs[index].getElementsByTagName("td")[parseInt(e)].innerText;
                if(!lista.includes(grupo)){
                    if(grupo!=""){
                        lista.push(grupo);
                    }else if(!lista.includes("No ha contestado")){
                        lista.push("No ha contestado")
                    }
                }         
            }
            let tamCol="col-4"    
            if(tablas.length<=2){
                tamCol= "col-12"
            }  
                
            desplegables.innerHTML +=`<select id="desplegable${numDesplegable}" class="${tamCol}">
                ${devuelveOpciones(lista)}</select>`;
                    
            numDesplegable+=1;        
        });
        var estados= []
        for(let it=1;it<=numDesplegable-1;it++){
            estados[it]="Todos"
            document.getElementById("desplegable"+it).addEventListener("change",(event)=>{
                estados[it]=document.getElementById("desplegable"+it).value
                for(let it2=1;it2<=numDesplegable-1;it2++){
                    if(it2!=it){
                        estados[it2]=document.getElementById("desplegable"+it2).value
                    }
                }
                if(document.getElementById("tipoRespuesta").value=="posibilidad de una única respuesta"){
                    dibujaGrafico(npregunta,tablas,estados)
                }
                else{
                    dibujaGraficoMultiRespuesta(npregunta,tablas,estados)
                }
            })
        }

        for(let i=0;i< radios.length;i++){
            if(radios[i].checked && i%2!=0){
                npregunta = radios[i].id.split("-")[1]
            }
        }
                
                document.getElementById("llamarfuncion").onclick=()=>{
                    
                    let tipoRespuesta = document.getElementById("tipoRespuesta");
                    if(tipoRespuesta.value=="posibilidad de una única respuesta"){
                        dibujaGrafico(npregunta,tablas,estados);
                    } else {
                        dibujaGraficoMultiRespuesta(npregunta,tablas,estados)
                    }
                    document.getElementById("cambiarNPregunta").onclick=()=>{
                        let radiosModales = document.getElementsByClassName("radiosModales");
                            for(let i = 0; i< radiosModales.length; i+=1){
                                if(radiosModales[i].checked){
                                    npregunta=radiosModales[i].id.split("-")[1]
                                }
                            }
                        if(tipoRespuesta.value=="posibilidad de una única respuesta"){
                            dibujaGrafico(npregunta,tablas,estados);
                        } else {
                            dibujaGraficoMultiRespuesta(npregunta,tablas,estados)
                        }
                    }
                    document.getElementById("savechanges").onclick=()=>{
                        let colores = document.getElementById("colores").value.split(",")
                        if(colores.length>1){ 
                            listaColores=colores
                        }
                        let visual = document.getElementById("visualizacion")
                        visualizacion = visual.value
                        if(tipoRespuesta.value=="posibilidad de una única respuesta"){
                            dibujaGrafico(npregunta,tablas,estados);
                        } else {
                            dibujaGraficoMultiRespuesta(npregunta,tablas,estados)
                        }
                    }
                    document.getElementById("resultado").style.opacity=1
                }
                let seccion2 = document.getElementById("seccion2");
                let seccion3 = document.getElementById("seccion3");
                seccion2.style.position="absolute";
                seccion2.style.left="-200000px";
                seccion3.style.position="relative";
                seccion3.style.left="0px";
                
                cargaTablaModal()

            }

    function cargaTablaModal(){
        let tabla =`<table class="table"> <thead>
        <tr>
        <th style="width:15%;"  scope="col">Estudiar</th>
        <th style="width:85%;"  scope="col">Enunciado de la pregunta</th>
        </tr>
        </thead>
        <tbody>`
        let trs = document.getElementById("tabla").getElementsByTagName("tr");
        let tds = trs[1].getElementsByTagName("td");
        for(let index = 1; index < tds.length; index++){
            tabla+=` <tr>
            <td><input class="radiosModales" id="estudiarModal-${index}" type="checkbox"></input></td>
            <th>${tds[index].innerText}</th>
            </tr>`;
        }
        tabla+=`</tbody></table>`
        document.getElementById("modalTabla").innerHTML = tabla
        
        for(let index = 1; index < tds.length; index+=1){
            let estudiar= document.getElementById("estudiarModal-"+index)
            estudiar.onclick = ()=>{
                let radios = document.getElementsByClassName("radiosModales");
                for(let i = 0; i< radios.length; i+=1){
                    if(radios[i].checked && radios[i].id!=estudiar.id){
                        radios[i].checked=false;
                    }
                }
            }
        }
        
    }
document.getElementById("savechanges").onclick=()=>{
        let colores = document.getElementById("colores").value.split(",")
        if(colores.length>1){ 
            listaColores=colores
        }
        let visual = document.getElementById("visualizacion")
        visualizacion = visual.value
        
    }
    