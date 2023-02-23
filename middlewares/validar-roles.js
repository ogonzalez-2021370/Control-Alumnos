const { request, response  } = require('express');

const esAdminRole = ( req = request, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    //Verificación solo el rol de Admi puede realizar la eliminación
    //Si cumple con el rol de admin se envia al controllador deleteUsuario
    const { rol, nombre  } = req.usuario
    //if ( rol !== 'ADMIN_ROLE') {
    if ( rol !== 'ROL_ALUMNO') {
        return res.status(401).json({
            msg: `${ nombre } no es Profesor - No puede eliminar`
        });
    }

    next();

}

module.exports = {
    esAdminRole
}