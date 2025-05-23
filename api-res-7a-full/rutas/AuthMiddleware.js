const jwt = require("jsonwebtoken");
const SECRET_KEY = "TuClaveSecreta";

const verificarToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No se proporcionó un token" });
    }

    try {
        const verificado = jwt.verify(token, SECRET_KEY);
        req.usuario = verificado; // Agregar información del usuario al request
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token inválido" });
    }
};

module.exports = verificarToken;
