const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin", // Puede ser 'user' o 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model("Usuario", UsuarioSchema, "usuarios");
