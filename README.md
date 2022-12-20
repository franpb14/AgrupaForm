# AgrupaForm
:warning: **this code was finished before the end of my career, may contain extracts of hard-to-digest code** :warning:


Esta idea nace de haber hecho para una Asignatura de la Universidad una página sobre [el impacto de la tecnología en el mundo laboral](cuestionariotis.tk/respuestas.html), a raíz de esto hubo gente que me preguntó como hacer esas agrupaciones por lo que decidí hacer eso mismo pero parametrizando para que todos los pudieran construir con unos sencillos pasos.
## ¿Para qué sirve?
Es una aplicación que permite analizar en profundidad los resultados de las encuestas de GoogleForms. Se podrán seleccionar aquellas respuestas en las que estemos interesados para combinar y segregar sus datos.

Por ejemplo, se podrían segregar los datos por género, edad, destino de preferencia y medio de transporte, de tal manera que podremos ver el porcentaje de respuestas de aquellas personas de género femenino, edad entre 18-25 años que quieran viajar por España en avión.
## Cómo usar offline
Basta con clonar el repositorio o descargar el código (Code>Download ZIP) y clickar dos veces en "index.html"
## Estructura del código
Al ser un código que en primera instancia pensaba usar para uso personal y conocidos quizá están descuidadas varias buenas prácticas, pero la estructura es la siguiente:
- **[index.html:](https://github.com/franpb14/AgrupaForm/blob/main/index.html)** página principal en la que se hacen todas las cargas y el cálculo de estadísticas.
- **[carga.js:](https://github.com/franpb14/AgrupaForm/blob/main/carga.js)** coge el archivo html que se sube y pone los datos en la propia página para poder recorrerlos con javascript.
- **[cargaAgrupaciones.js:](https://github.com/franpb14/AgrupaForm/blob/main/cargaAgrupaciones.js)** quizá el archivo más importante junto al siguiente, hace la lista para que el usuario escoja una opción y  una vez que se introducen las columnas por las que se desea agrupar este archivo recorre esas columnas para hacer los desplegables que servirán posteriormente para segregar los datos. 
- **[dibujaGrafico.js:](https://github.com/franpb14/AgrupaForm/blob/main/dibujaGrafico.js)** se pueden ver dos parámetros configurables por los usuarios que son listaColores y visualización (predefinidos con 10 colores y con visualización tipo tarta), dibujaGrafico que sirve para la posibilidad de una única respuesta y dibujaGraficoMultiRespuesta que sirve para el otro tipo. Estos algoritmos se apoyan en otros como cumpleEstados (que devuelve un booleano en función de si cumple las agrupaciones), obtenPosibilidadesRespuestas/Multirespuestas (obtiene todas las posibilidades de respuestas), calculaPorcentajeTotales (que calcula el porcentaje una vez que ha calculado la frecuencia)
- **[tutorial.html:](https://github.com/franpb14/AgrupaForm/blob/main/tutorial.html)**  Muestra un tutorial detallado para usar la página.
- **[extras.html:](https://github.com/franpb14/AgrupaForm/blob/main/extras.html)** Hace algunas aclaraciones y explica como usar los ajustes extras que no son necesarios quizás para el uso normal de la página.
