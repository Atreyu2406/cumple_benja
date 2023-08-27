const preguntas = [
    {
        pregunta: "¿En qué país se jugó la primera Copa Mundial de Fútbol?",
        opciones: ["Brasil", "Uruguay", "Italia"],
        respuesta: 2
    },
    {
        pregunta: "¿Cuántos jugadores hay en el campo durante un partido?",
        opciones: ["22", "11", "8"],
        respuesta: 1
    },
    {
        pregunta: "¿Cuál es el nombre de la novia de Davoo Xeneize?",
        opciones: ["Sofía", "Carolina", "Milena"],
        respuesta: 3
    },
    {
        pregunta: "¿Qué jugador fue el ganador del Balón de Oro 2022?",
        opciones: ["Ronaldo", "Benzema", "Messi"],
        respuesta: 2
    },
    {
        pregunta: "¿Quién ganó el Mundial de 1934?",
        opciones: ["Uruguay", "Argentina", "Italia"],
        respuesta: 3
    },
    {
        pregunta: "¿Qué equipo Argentino fue el que sacó más puntos en la Fase de Grupos de la actual Copa Libertadores'?",
        opciones: ["River", "Racing", "Boca"],
        respuesta: 2
    },
    {
        pregunta: "¿Quién es el arquero titular del Barcelona?",
        opciones: ["Ter Stegen", "Tagliamonte", "Buffon"],
        respuesta: 1
    },
    {
        pregunta: "¿Cuál fue el resultado de los penales en la Final entre Inter Miami y Nashville'?",
        opciones: ["5 a 3", "7 a 6", "10 a 9"],
        respuesta: 3
    },
    {
        pregunta: "¿Quién fue el campeón de la primera edición de la Kings Legue?",
        opciones: ["Porcinos FC", "El Barrio", "Ultimate Móstoles"],
        respuesta: 2
    },
    {
        pregunta: "¿Cuál es el equipo del Fútbol Argentino que tiene más copas?",
        opciones: ["Racing", "Boca", "River"],
        respuesta: 2
    }
];

const inicioBoton = document.getElementById('inicio');
const preguntaElemento = document.getElementById('pregunta');
const opcionesElementos = [document.getElementById('opcion1'), document.getElementById('opcion2'), document.getElementById('opcion3')];
const labelElementos = [document.getElementById('label1'), document.getElementById('label2'), document.getElementById('label3')];
const siguienteBoton = document.getElementById('siguiente');
const puntuacionElemento = document.getElementById('puntuacion');
const tiempoElemento = document.getElementById('tiempo');

let indicePregunta = 0;
let puntuacion = 0;
let tiempoRestante = 20;
let temporizador;

function mostrarPregunta() {
    tiempoRestante = 20;
    tiempoElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;

    // Mostrar los checkboxes y etiquetas
    document.getElementById('opcion1-container').style.display = "block";
    document.getElementById('opcion2-container').style.display = "block";
    document.getElementById('opcion3-container').style.display = "block";

    temporizador = setInterval(() => {
        tiempoRestante--;
        tiempoElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;

        if (tiempoRestante === 0) {
            clearInterval(temporizador);
            verificarRespuesta();
        }
    }, 2000);

    const preguntaActual = preguntas[indicePregunta];
    preguntaElemento.textContent = preguntaActual.pregunta;
    preguntaElemento.style.display = "block";

    for (let i = 0; i < 3; i++) {
        labelElementos[i].textContent = preguntaActual.opciones[i];
        opcionesElementos[i].style.display = "block";
        labelElementos[i].style.display = "block";
    }

    siguienteBoton.style.display = "block";
    inicioBoton.style.display = "none";
    tiempoElemento.style.display = "block";
}

inicioBoton.addEventListener('click', () => {
    inicioBoton.style.display = "none"; // Ocultar el botón "Comenzar"
    mostrarPregunta();
});

function verificarRespuesta() {
    clearInterval(temporizador);

    const opcionSeleccionada = document.querySelector('input[name="opcion"]:checked');
    
    if (opcionSeleccionada) {
        const indiceRespuesta = Number(opcionSeleccionada.id.slice(-1));
        const preguntaActual = preguntas[indicePregunta];
        
        if (indiceRespuesta === preguntaActual.respuesta) {
            puntuacion++;
        }
    }

    puntuacionElemento.textContent = `Puntuación: ${puntuacion}`;
    indicePregunta++;

    if (indicePregunta < preguntas.length) {
        mostrarPregunta();
    } else {
        preguntaElemento.textContent = "Trivia completada. Tu puntuación final es: " + puntuacion;
        for (let i = 0; i < 3; i++) {
            opcionesElementos[i].style.display = "none";
            labelElementos[i].style.display = "none";
        }
        siguienteBoton.style.display = "none";
        tiempoElemento.style.display = "none";
    }
}

inicioBoton.addEventListener('click', mostrarPregunta);
siguienteBoton.addEventListener('click', () => {
    clearInterval(temporizador);
    verificarRespuesta();
});