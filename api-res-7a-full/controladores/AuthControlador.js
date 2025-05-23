const Usuario = require("../usuario/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "TuClaveSecreta"; // Usa una clave secreta segura

// Registro de usuario
// En AuthControlador.js, método registrar:
const registrar = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const existeUsuario = await Usuario.findOne({ username });
        if (existeUsuario) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Hashear la contraseña antes de guardar
        const passwordHash = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario({ username, password: passwordHash, role });

        await nuevoUsuario.save();

        return res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar el usuario" });
    }
};


// Inicio de sesión
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar el usuario
        const usuario = await Usuario.findOne({ username });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: usuario._id, username: usuario.username, role: usuario.role },
            SECRET_KEY,
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            usuario: { username: usuario.username, role: usuario.role }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al iniciar sesión" });
    }
};

module.exports = { registrar, login };
