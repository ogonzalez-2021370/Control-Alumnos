const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    
    rol: {
        type: String,
        default: 'ROL_ALUMNO',
        required: true,
        //emun: ['ROL_ALUMNO', 'ROL_MAESTRO']
    },
    
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Estudiante', EstudianteSchema)