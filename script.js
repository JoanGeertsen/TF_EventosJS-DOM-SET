let eventos = [];
let numeroEvento = 1; //Borrar

//Función proximo de la teoría
let proximo = (function () {
    let numero = 0;
    return function () {
        numero++;
        return numero;
    };
})();

function actualziarTabla(tabla){
    const tablaResultados = document.getElementById('tabla-resultados').querySelector('tbody');

    tablaResultados.innerHTML = "";

    tabla.forEach((evento, i) => {
        const fila = document.createElement('tr');
    fila.innerHTML = `
                    <td>${evento.nombre}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.ciudad}</td>
                    <td><img src="recursos/editar.png" alt="Editar" onclick="editarEvento(${i})" style="cursor: pointer;"></td>
                    <td><img src="recursos/eliminar.png" alt="Eliminar" style="cursor: pointer;"></td>
                `;

    tablaResultados.appendChild(fila);
    });

    document.getElementById('evento-form').reset();
}

function editarEvento(index){    
    console.log(`Editando evento ${index}`);
    document.getElementById("boton-enviar").style.display = "none";
    document.getElementById("boton-reset").style.display = "none";
    document.getElementById("boton-actualizar").style.display = "block";
}

document.getElementById('boton-enviar').addEventListener('click', function() {    
    const eventoNombre = document.getElementById('evento-nombre').value;
    const tipoEvento = document.querySelector('input[name="evento-tipo"]:checked');
    const fechaEvento = document.getElementById('evento-fecha').value;
    const direccion = document.getElementById('evento-direccion').value;
    const ciudad = document.getElementById('evento-cidad').value;
    const capacidad = document.getElementById('evento-capacidad').value;
    const gratuito = document.getElementById('evento-gratuito').checked;
    const costoEntrada = document.getElementById('evento-costo').value;
    const valoracion = document.getElementById('evento-puntuacion').value;
    const observaciones = document.getElementById('evento-notas').value;

    

    // Validaciones
    if (!eventoNombre || !tipoEvento || !fechaEvento || !direccion || !capacidad || !valoracion) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    // Verifica si ya existe un evento con el mismo nombre
    if (eventos.some(evento => evento.nombre === eventoNombre)) {
        alert("El nombre del evento ya está registrado.");
    }
    
    else
    {
         // Crea el objeto del evento
         const evento = {
            numero: proximo(),
            nombre: eventoNombre,
            tipo: tipoEvento.value,
            fecha: fechaEvento,
            direccion: direccion,
            ciudad: ciudad,
            capacidad: capacidad,
            gratuito: gratuito,
            costo: gratuito ? 'Gratuito' : costoEntrada,
            valoracion: valoracion,
            observaciones: observaciones
         };
    
        eventos.push(evento); console.log("Evento creado");

        actualziarTabla(eventos);
    }   

    /*
    alert(`Evento ${evento.nombre} registrado con éxito.
        Detalles:
        Número: ${evento.numero}
        Tipo: ${evento.tipo}
        Fecha: ${evento.fecha}
        Dirección: ${evento.direccion}
        Ciudad: ${evento.ciudad}
        Capacidad: ${evento.capacidad}
        Gratuito: ${evento.gratuito ? 'Sí' : 'No'}
        Costo: ${evento.costo}
        Valoración: ${evento.valoracion}
        Observaciones: ${evento.observaciones}`);*/

    // Resetea los campos del formulario    
});

const valorPuntuacion = document.getElementById('valorPuntuacion');
const inputPuntuacion = document.getElementById('evento-puntuacion');

inputPuntuacion.addEventListener('input', function() {
    valorPuntuacion.textContent = inputPuntuacion.value;
});

document.getElementById('contieneBtn').addEventListener('click', function() {    
    let inputText = document.getElementById("textoFiltro").value;
    const eventosEncontrados = eventos.filter(e => e.nombre.toLowerCase().includes(inputText.toLowerCase()));

    actualziarTabla(eventosEncontrados);
});

document.getElementById('comienzaBtn').addEventListener('click', function() {    
    let inputText = document.getElementById("textoFiltro").value;
    const eventosEncontrados = eventos.filter(e => new RegExp(`^${inputText}`, 'i').test(e.nombre));

    actualziarTabla(eventosEncontrados);
});

document.getElementById('finalizaBtn').addEventListener('click', function() {    
    let inputText = document.getElementById("textoFiltro").value;
    const eventosEncontrados = eventos.filter(e => new RegExp(`${inputText}$`, 'i').test(e.nombre));

    actualziarTabla(eventosEncontrados);
});

