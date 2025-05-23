const Usuario = require("../modelos/Usuario");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar datos de entrada
        if (!username || !password) {
            return res.status(400).json({
                status: "Error",
                mensaje: "Faltan datos de usuario o contraseña",
            });
        }

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ username });

        if (!usuario) {
            return res.status(401).json({
                status: "Error",
                mensaje: "Credenciales inválidas",
            });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return res.status(401).json({
                status: "Error",
                mensaje: "Credenciales inválidas",
            });
        }

        // Devolver éxito con datos básicos
        return res.status(200).json({
            status: "OK",
            mensaje: "Login exitoso",
            usuario: {
                id: usuario._id,
                username: usuario.username,
                role: usuario.role,
            },
        });
    } catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({
            status: "Error",
            mensaje: "Error interno en el servidor",
        });
    }
};

module.exports = { login };
