const Usuario = require("../usuario/Usuario");
const bcrypt = require("bcryptjs");
const crearUsuarioAdmin = async () => {
    try {
        const adminExistente = await Usuario.findOne({ username: "admin" });

        if (adminExistente) {
            console.log("El usuario administrador ya existe.");
            return;
        }
        const passwordHash = await bcrypt.hash("admin123", 10);
        const admin = new Usuario({
            username: "admin",
            password: passwordHash,
            role: "admin",
        });

        await admin.save();
        console.log("Usuario administrador creado exitosamente.");
    } catch (error) {
        console.error("Error al crear el usuario administrador:", error);
    }
};
module.exports = crearUsuarioAdmin;
