//Importacion
const { response, request } = require('express');
//Modelos
const Estudiante = require('../models/estudiantes');

const obtenerEstudiantes = async(req = request, res = response) => {

     //Condición, me busca solo los productos que tengan estado en true
     const query = { estado: true };

     const listaEstudiantes = await Promise.all([
         Estudiante.countDocuments(query),
         Estudiante.find(query)
                .populate('curso', 'nombre')
     ]);
 
     res.json({
         msg: 'GET API de estudiantes',
         listaEstudiantes: listaEstudiantes
     });

}

const obtenerEstudiantePorId = async(req = request, res = response) => {

    const { id } = req.params;
    const estudiante = await Estudiante.findById( id )
                                            .populate('curso', 'nombre')

    res.json({
        msg: 'curso por id',
        estudiante: estudiante
    });

}


const crearEstudiante = async (req = request, res = response) => {
                                //operador spread
        const { estado, usuario, ...body } = req.body;

        //validación si existe un estudiante en la db
        const estudianteEnDB = await Estudiante.findOne( { nombre: body.nombre } );

        if ( estudianteEnDB ) {
            return res.status(400).json({
                mensajeError: `El estudiante ${ estudianteEnDB.nombre } ya existe en la DB`
            });
        }


        //Generar data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            estudiante: req.estudiante
        }

        const estudiante = new Estudiante( data );

        //Guardar en DB
        await estudiante.save();

        res.status(201).json({
            msg: 'Post Estudiante',
            estudiante: estudiante
        });


}


const actualizarEstudiante = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, curso, ...data } = req.body;

    if ( data.nombre ) {
        data.nombre = data.nombre;
    }
    
    data.estudiante = req.estudiante; //hacemos referencia al usuario que hizo el put por medio del token

    //Edición de producto               // new: true Sirve para enviar el nuevo documento actualizado     
    const estudiante = await Estudiante.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        msg: 'Put de estudiante',
        estudiante: estudiante
    });

}


const eliminarEstudiante = async(req = request, res = response) => {

    const { id } = req.params;
    const estudianteBorrado = await Estudiante.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: 'delete estudiante',
        estudianteBorrado: estudianteBorrado
    });

}



module.exports = {
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}