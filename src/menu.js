view_menuPrincipal();

function view_menuPrincipal() {
  document.getElementById("root").innerHTML = `
    <h1>Bienvenido al juego de preguntas</h1>
    <h2>Menú Principal</h2>
    <h4>Tienes las siguientes opciones:</h4>
    <button class="iniciar" onclick="ctrl_iniciarJuego()">1. Iniciar Juego</button>
    <br><br>
    <button class="historico" onclick="ctrl_verHistorico()">2. Ver Histórico</button>
  `;
}


function ctrl_iniciarJuego() {
  view_iniciar_juego();
}

function ctrl_irAMenuPrincipal() {
  view_menuPrincipal();
}

function ctrl_verHistorico() {
  view_historico();
}
const music = document.getElementById("background-music");
const toggleButton = document.getElementById("toggle-music-btn");

function toggleMusic() {
  if (music.paused) {
    music.play();
    toggleButton.textContent = "🔊"; // Cambia el ícono cuando la música está activa
  } else {
    music.pause();
    toggleButton.textContent = "🔇"; // Cambia el ícono cuando la música está en pausa
  }
}

// Iniciar con el ícono correcto según el estado inicial de la música
window.onload = function() {
  if (music.paused) {
    toggleButton.textContent = "🔇";
  } else {
    toggleButton.textContent = "🔊";
  }
}


