const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    rol: 
    {
        type: String,
        default: 'ROL_MAESTRO',
        required: true,
        //emun: ['ROL_MAESTRO']
        
    }, 
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Maestro', MaestroSchema)