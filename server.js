const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Esto habilita CORS para todas las rutas

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   
    password: '', 
    database: 'database'   
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});


app.post('/submit', (req, res) => {
    const { name, points } = req.body;
    
    const sql = 'INSERT INTO `tabla_historial` (nombre, puntaje) VALUES (?, ?)';
    db.query(sql, [name, points], (err, result) => {
        if (err) {
            console.error('Error al registrar datos: ', err);
            return res.status(500).send('Error al registrar los datos');
        }
        res.send('Registro exitoso');
    });
});


app.post('/api/registrar-nickname', (req, res) => {
    const { nickname } = req.body;

    const sql = 'INSERT INTO `tabla_historial` (nombre) VALUES (?)';
    db.query(sql, [nickname], (err, result) => {
        if (err) {
            console.error('Error al registrar el nickname: ', err);
            return res.status(500).send('Error al registrar el nickname');
        }
        res.send({ message: 'Nickname registrado exitosamente' });
    });
});


app.post('/api/registrar-puntaje', (req, res) => {
    const { nickname, puntaje } = req.body;
    
    console.log("Nickname:", nickname); // Verifica el valor de nickname
    console.log("Puntaje:", puntaje); // Verifica el valor de puntaje

    const query = `INSERT INTO tabla_historial (nombre, puntaje) VALUES (?, ?)`;
    
    db.query(query, [nickname, puntaje], (err, result) => {
      if (err) {
        console.error('Error al registrar puntaje:', err); // Muestra el error específico
        res.status(500).json({ error: 'Error al registrar puntaje' });
        return;
      }
      res.status(200).json({ message: 'Puntaje registrado correctamente' });
    });
});

app.get('/api/historico', (req, res) => {
    const query = 'SELECT nombre, puntaje FROM tabla_historial ORDER BY puntaje DESC LIMIT 10';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener el historial:', err.stack);
            return res.status(500).json({ success: false, message: 'Error al obtener el historial' });
        }
        res.json({ success: true, data: results });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


