//Importacion
const { response, request } = require('express');
//Modelos
const Maestro = require('../models/maestros');

const obtenerMaestros = async(req = request, res = response) => {

     //Condición, me busca solo los productos que tengan estado en true
     const query = { estado: true };

     const listaMaestros = await Promise.all([
         Maestro.countDocuments(query),
         Maestro.find(query)
                .populate('curso', 'nombre')
     ]);
 
     res.json({
         msg: 'GET API de maestros',
         listaMaestros: listaMaestros
     });

}

const obtenerMaestroPorId = async(req = request, res = response) => {

    const { id } = req.params;
    const maestro = await Maestro.findById( id )
                                            .populate('curso', 'nombre')

    res.json({
        msg: 'curso por id',
        maestro: maestro
    });

}


const crearMaestro = async (req = request, res = response) => {
                                //operador spread
        const { estado, usuario, ...body } = req.body;

        //validación si existe un estudiante en la db
        const maestroEnDB = await Maestro.findOne( { nombre: body.nombre } );

        if ( maestroEnDB ) {
            return res.status(400).json({
                mensajeError: `El maestro ${ maestroEnDB.nombre } ya existe en la DB`
            });
        }


        //Generar data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            maestro: req.maestro
        }

        const maestro = new Maestro( data );

        //Guardar en DB
        await maestro.save();

        res.status(201).json({
            msg: 'Post Maestro',
            estudiante: maestro
        });


}


const actualizarMaestro = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, curso, ...data } = req.body;

    if ( data.nombre ) {
        data.nombre = data.nombre;
    }
    
    data.maestro = req.maestro; //hacemos referencia al usuario que hizo el put por medio del token

    //Edición de producto               // new: true Sirve para enviar el nuevo documento actualizado     
    const maestro = await Maestro.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        msg: 'Put de maestro',
        maestro: maestro
    });

}


const eliminarMaestro = async(req = request, res = response) => {

    const { id } = req.params;
    const maestroBorrado = await Maestro.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: 'delete maestro',
        maestroBorrado: maestroBorrado
    });

}



module.exports = {
    obtenerMaestros,
    obtenerMaestroPorId,
    crearMaestro,
    actualizarMaestro,
    eliminarMaestro
}