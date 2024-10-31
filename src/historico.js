function view_historico(datosHistorico) {
  // datosHistorico es el array de objetos traído desde la base de datos
  const tablaHistorico = datosHistorico
      .map(
          (item) => `<tr><td>${item.nombre}</td><td>${item.puntaje}</td></tr>`
      )
      .join("");

  document.getElementById("root").innerHTML = `
      <h1>Bienvenido al juego de preguntas</h1>
      <h3>Tabla histórico de partidas:</h3>
      <table>
          <tr><th>Nombre</th><th>Puntaje</th></tr>
          ${tablaHistorico}
      </table>
      <br>
      <br>
      <button onclick="ctrl_irAMenuPrincipal()">Regresar a menú principal</button>
  `;
}
// Controladores: obtienen el historial de la base de datos y lo muestran
function ctrl_verHistorico() {
  fetch("http://localhost:3000/api/historico")
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then((data) => {
          if (data.success) {
              console.log('Datos del historial:', data.data); // Para depuración
              view_historico(data.data); // Pasamos los datos obtenidos a la vista
          } else {
              alert("Error al obtener el historial: " + data.message);
          }
      })
      .catch((error) => {
          console.error("Error al obtener el historial:", error);
          alert("Hubo un problema al obtener el historial.");
      });
}

function ctrl_irAMenuPrincipal() {
  view_menuPrincipal();
}
