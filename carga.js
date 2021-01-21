
document.getElementById('input-file').addEventListener('change', getFile)
document.getElementById('cargar').onclick=()=>{
    document.getElementById("tabla").innerHTML=document.getElementById('content-target').value
    let seccion2 = document.getElementById("seccion2")
    let seccion1 = document.getElementById("seccion1")
    seccion2.style.position="relative"
    seccion2.style.left="0px"
    seccion1.style.position="absolute"
    seccion1.style.left="-20000px"
    leePreguntas()
}
function leePreguntas(){
    let eligeColumnas = document.getElementById("eligeColumnas")
    let tabla =`<table class="table"> <thead>
    <tr>
      <th style="width:15%;" scope="col">Agrupar por</th>
      <th style="width:15%;"  scope="col">Estudiar</th>
      <th style="width:70%;"  scope="col">Enunciado de la pregunta</th>
    </tr>
  </thead>
  <tbody>`
    let trs = document.getElementById("tabla").getElementsByTagName("tr");
    let tds = trs[1].getElementsByTagName("td");
    for(let index = 1; index < tds.length; index++){
        tabla+=` <tr>
        <td><input class="radios" id="agrupacion-${index}" type="checkbox"></input></td>
        <td><input class="radios" id="estudiar-${index}" type="checkbox"></input></td>
        <th>${tds[index].innerText}</th>
        </tr>`;
    }
    tabla+=`</tbody></table>`
    eligeColumnas.innerHTML = tabla
    
    for(let index = 1; index < tds.length; index+=1){
        let estudiar= document.getElementById("estudiar-"+index)
        estudiar.onclick = ()=>{
            let radios = document.getElementsByClassName("radios");
            for(let i = 1; i< radios.length; i+=2){
                if(radios[i].checked && radios[i].id!=estudiar.id){
                    radios[i].checked=false;
                }
            }
        }
    }
        
}
function getFile(event) {
    const input = event.target
if ('files' in input && input.files.length > 0) {
    placeFileContent(
    document.getElementById('content-target'),
    input.files[0])
    
}
}

function placeFileContent(target, file) {
    readFileContent(file).then(content => {
    target.innerHTML = content
}).catch(error => console.log(error))
}

function readFileContent(file) {
    const reader = new FileReader()
return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
})
}
