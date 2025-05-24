let inputComida = document.getElementById("inputComida");
let inputPrecio = document.getElementById("inputPrecio");
let btnAgregar = document.getElementById("btnAgregar");
let comidas = [];

btnAgregar.addEventListener("click", AgregarComida);

function ObtenerComidas(){
    let tbody = document.getElementById("tbodyComidas");
    tbody.innerHTML = "";

    comidas.forEach((comida, i)=>{
        let fila = document.createElement("tr");
        let celdaComida = document.createElement("td");
        let celdaPrecio = document.createElement("td");

        celdaComida.textContent = comida.nombre;
        celdaPrecio.textContent = comida.precio;

        fila.appendChild(celdaComida);
        fila.appendChild(celdaPrecio);
        tbody.appendChild(fila);
    });
};

function AgregarComida(){
    let comida = inputComida.value.trim();
    let precio = inputPrecio.value.trim();

    if(comida === ""){
        alert("Debes completar todos los campos");
        inputComida.focus();
        return;
    }

    if(precio === ""){
        alert("Debes completar todos los campos");
        inputPrecio.focus();
        return;
    }

    if(isNaN(precio)){
        alert("El precio debe contener un valor valido");
        inputPrecio.focus();
        return;
    }

    comidas.push({
        nombre: comida,
        precio: precio
    });

    inputComida.value = "";
    inputPrecio.value = "";
    ObtenerComidas();
}

function MostrarComidasMayoresA100(){
    for(i=0; i<comidas.length; i++){
        if(comidas[i].precio>100){
            console.log("comida: )
        }
    } 
}
