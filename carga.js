
document.getElementById('input-file').addEventListener('change', getFile)
document.getElementById('cargar').onclick=()=>{
    document.getElementById("tabla").innerHTML=document.getElementById('content-target').value
    let seccion2 = document.getElementById("seccion2")
    let seccion1 = document.getElementById("seccion1")
    seccion2.style.position="relative"
    seccion2.style.left="0px"
    seccion1.style.position="absolute"
    seccion1.style.left="-20000px"
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
