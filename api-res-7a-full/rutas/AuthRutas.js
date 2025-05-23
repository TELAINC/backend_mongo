const express = require("express");
const router = express.Router();
const AuthControlador = require("../controladores/AuthControlador");

// Rutas de autenticación
router.post("/registro", AuthControlador.registrar);
router.post("/login", AuthControlador.login);

module.exports = router;
