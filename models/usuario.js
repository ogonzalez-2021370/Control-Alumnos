const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    rol: {
        type: String,
        default: 'ROL_ALUMNO',
        required: true,
        emun: ['ROL_MAESTRO', 'ROL_ALUMNO']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', UsuarioSchema)