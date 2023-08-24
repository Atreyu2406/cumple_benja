const preguntas = [
    {
        pregunta: "¿En qué país se jugó la primera Copa Mundial de Fútbol?",
        opciones: ["Brasil", "Uruguay", "Italia"],
        respuesta: 2
    },
    {
        pregunta: "¿Cuántos jugadores hay en un equipo de fútbol en el campo durante un partido?",
        opciones: ["10", "11", "12"],
        respuesta: 2
    },
    {
        pregunta: "¿Qué jugador es conocido como 'La Pulga'?",
        opciones: ["Lionel Messi", "Cristiano Ronaldo", "Neymar"],
        respuesta: 1
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
let tiempoRestante = 10;
let temporizador;

function mostrarPregunta() {
    tiempoRestante = 10;
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
    }, 1000);

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
        preguntaElemento.textContent = "Trivia completada. ¡Tu puntuación final es: " + puntuacion;
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