let eventos = [];
let numeroEvento = 1;

//Función proximo de la teoría
let proximo = (function () {
    let numero = 0;
    return function () {
        numero++;
        return numero;
    };
})();

function actualziarTabla(){
    const tablaResultados = document.getElementById('tabla-resultados').querySelector('tbody');

    tablaResultados.innerHTML = "";

    eventos.forEach(evento => {
        const fila = document.createElement('tr');
    fila.innerHTML = `
                    <td>${evento.nombre}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.ciudad}</td>
                    <td><img src="recursos/editar.png" alt="Editar" style="cursor: pointer;"></td>
                    <td><img src="recursos/eliminar.png" alt="Eliminar" style="cursor: pointer;"></td>
                `;

    tablaResultados.appendChild(fila);
    });

    document.getElementById('evento-form').reset();
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

        actualziarTabla();
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


document.getElementById('listarBtn').addEventListener('click', function() {
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "";  // Limpiar el contenido anterior
    
    if (eventos.length === 0) {
        resultadoDiv.innerHTML = "<p>No hay eventos registrados aún.</p>";
        return;
    }

    // Título con clase CSS
    let titulo = document.createElement('h3');
    titulo.textContent = "Eventos Registrados:";
    titulo.classList.add('titulo-eventos');
    resultadoDiv.appendChild(titulo);

    // Listar los eventos
    eventos.forEach(evento => {
        let p = document.createElement('p');
        p.innerHTML = `<strong>${evento.nombre}</strong> - ${evento.fecha}`;
        p.classList.add('nombre-evento'); 
        resultadoDiv.appendChild(p);
    });
});


document.getElementById('buscarBtn').addEventListener('click', function() {
    const eventoNombre = prompt("Ingrese el nombre del evento a buscar:");
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "";  

    // Buscar eventos cuyo nombre contenga la palabra buscada (ignorando mayúsculas/minúsculas)
    const eventosEncontrados = eventos.filter(e => e.nombre.toLowerCase().includes(eventoNombre.toLowerCase()));
    
    if (eventosEncontrados.length > 0) {
        
        let titulo = document.createElement('h3');
        titulo.textContent = "resultados de la búsqueda:";
        titulo.classList.add('titulo-eventos');
        resultadoDiv.appendChild(titulo);

        // Mostrar los detalles de cada evento encontrado
        eventosEncontrados.forEach(evento => {
            let p = document.createElement('p');
            p.innerHTML = `<strong>${evento.nombre}</strong><br>
                           Fecha: ${evento.fecha}<br>
                           Número evento: ${evento.numero}<br>
                           Tipo:  ${evento.tipo}<br>
                           Dirección: ${evento.direccion}<br>
                           Ciudad: ${evento.ciudad}<br>
                           Capacidad: ${evento.capacidad}<br>
                           Valoración: ${evento.valoracion}<br>                           
                           Costo: $${evento.costo}<br>
                           Observaciones: ${evento.observaciones}`;
            p.classList.add('nombre-evento');
            resultadoDiv.appendChild(p);
        });
    } else {
        // Muestra un mensaje si no se encontraron eventos
        resultadoDiv.innerHTML = "<p>No se encontraron eventos con ese nombre.</p>";
    }
});


document.getElementById('filtrarBtn').addEventListener('click', function() {
    const city = prompt("Ingrese la ciudad para filtrar eventos:");
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "";  

    // Filtrar los eventos que coincidan con la ciudad (ignorando mayúsculas/minúsculas y tildes)
    const eventosFiltrados = eventos.filter(e => 
        e.ciudad.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 
        city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
    
    
    if (eventosFiltrados.length > 0) {
        
        let titulo = document.createElement('h3');
        titulo.textContent = "Eventos en " + city + ":";
        titulo.classList.add('titulo-eventos');
        resultadoDiv.appendChild(titulo);

        
        eventosFiltrados.forEach(evento => {
            let p = document.createElement('p');
            p.innerHTML = `<strong>${evento.nombre}</strong><br>
                           Fecha: ${evento.fecha}<br>
                           Número evento: ${evento.numero}<br>
                           Tipo:  ${evento.tipo}<br>
                           Dirección: ${evento.direccion}<br>
                           Ciudad: ${evento.ciudad}<br>
                           Capacidad: ${evento.capacidad}<br>
                           Valoración: ${evento.valoracion}<br>                           
                           Costo: $${evento.costo}<br>
                           Observaciones: ${evento.observaciones}`;
            p.classList.add('nombre-evento');
            resultadoDiv.appendChild(p);
        });
    } else {
        
        resultadoDiv.innerHTML = `<p>No se encontraron eventos en la ciudad de ${city}.</p>`;
    }
});


document.getElementById('extraBtn').addEventListener('click', function() {
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "";  
    
    if (eventos.length === 0) {
        resultadoDiv.innerHTML = "<p>No hay eventos registrados aún.</p>";
        return;
    }

    
    let titulo = document.createElement('h3');
    titulo.textContent = "Próximos eventos:";
    titulo.classList.add('titulo-eventos');
    resultadoDiv.appendChild(titulo);

    // Ordenar los eventos por fecha
    const eventosOrdenados = [...eventos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // Listar los eventos ordenados
    eventosOrdenados.forEach(evento => {
        let p = document.createElement('p');
        p.innerHTML = `<strong>${evento.nombre}</strong> - ${evento.fecha}`;
        p.classList.add('nombre-evento');  
        resultadoDiv.appendChild(p);
    });
});

