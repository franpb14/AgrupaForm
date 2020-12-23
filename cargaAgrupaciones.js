        function devuelveOpciones(lista){
                text =`<option selected>Todos</option>`;
                lista.forEach(el=>{
                    text +=`<option>${el}</option>`;
                })
                return text;
            }
            
            document.getElementById("agrupar").onclick=()=>{
                let numDesplegable=1;
                let agrupacion = document.getElementById("agrupacion").value;
                let trs = document.getElementsByTagName("tr");
                var tablas = agrupacion.split(",");
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
                        if(document.getElementById("tipoRespuesta").value=="posibilidad de una respuesta"){
                            
                            dibujaGrafico(npregunta.value,tablas,estados)
                        }
                        else{
                            dibujaGraficoMultiRespuesta(npregunta.value,tablas,estados)
                        }
                    })
                }
                
                document.getElementById("llamarfuncion").onclick=()=>{
                    var npregunta=document.getElementById("npregunta").value;
                    let tipoRespuesta = document.getElementById("tipoRespuesta");
                    if(tipoRespuesta.value=="posibilidad de una respuesta"){
                        dibujaGrafico(npregunta,tablas,estados);
                    } else {
                        dibujaGraficoMultiRespuesta(npregunta,tablas,estados)
                    }
                    document.getElementById("resultado").style.opacity=1
                }
                let seccion2 = document.getElementById("seccion2");
                let seccion3 = document.getElementById("seccion3");
                seccion2.style.position="absolute";
                seccion2.style.left="-200000px";
                seccion3.style.position="relative";
                seccion3.style.left="0px";

            }