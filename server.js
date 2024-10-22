const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors()); // Esto habilita CORS para todas las rutas

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Cambia esto
    password: '', // Cambia esto
    database: 'database'    // Cambia esto
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar puntos
app.post('/submit', (req, res) => {
    const { name, points } = req.body;
    
    const sql = 'INSERT INTO `tabla` (usuarios, puntos) VALUES (?, ?)';
    db.query(sql, [name, points], (err, result) => {
        if (err) {
            console.error('Error al registrar datos: ', err);
            return res.status(500).send('Error al registrar los datos');
        }
        res.send('Registro exitoso');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
