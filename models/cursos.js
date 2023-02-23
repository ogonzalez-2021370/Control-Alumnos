const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion  es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    } /*,
    maestro: {
        type: Schema.Types.ObjectId,ref: "Maestro"
    }*/
});

module.exports = model('Curso', CursoSchema)