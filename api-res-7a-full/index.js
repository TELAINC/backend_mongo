const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { conexion } = require("./basedatos/conexion");
const rutas_articulo = require("./rutas/ArticuloRutas");
const rutas_auth = require("./rutas/AuthRutas");

// Inicializar la aplicación
const app = express();
const puerto = 3900;

// Conectar a la base de datos
conexion();

// Configuración de CORS
const corsOptions = {
    origin: "http://localhost:3000", // Cambia esto a la URL de tu frontend en producción
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions)); // Aplicar CORS con las opciones definidass
app.use(bodyParser.json()); // Procesar datos JSON
app.use(bodyParser.urlencoded({ extended: true })); // Procesar datos de formularios
app.use(express.json()); // Alternativa para JSON (redundante con bodyParser)
const crearUsuarioAdmin = require("./usuario/initAdmin");
// Crear el usuario administrador inicial

crearUsuarioAdmin();
// Cargar rutas
app.use("/api", rutas_articulo);
app.use("/api/auth", rutas_auth);

app.get("/", (req, res) => {
    return res.send(`
        <h1>BACKEND FUNCIONANDO</h1>
    `);
});

// Ruta protegida de ejemplo
const verificarToken = require("./rutas/AuthMiddleware");
app.get("/api/protegido", verificarToken, (req, res) => {
    res.status(200).json({ message: "Ruta protegida", usuario: req.usuario });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Imprimir el error en consola
    res.status(500).send("Algo salió mal!"); // Enviar un mensaje genérico
});

// Iniciar el servidor
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});
