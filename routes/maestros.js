const { Router } = require('express');
const { check } = require('express-validator');

const { existeEstudiantePorId: existeMaestroPorId } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

//Controllers
const { obtenerMaestros,
        obtenerMaestroPorId,
        crearMaestro,
        actualizarMaestro,
        eliminarMaestro } = require('../controllers/maestros');

const router = Router();

// Obtener todas los productos - publico
router.get('/mostrar', obtenerMaestros);

// Obtener un producto por el id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeMaestroPorId ),
    validarCampos
],obtenerMaestroPorId);

// Crear Producto - privado - cualquier persona con un token valido
router.post('/agregar', [
    //validarJWT,
    check('nombre', 'El nombre del maestro es obligatorio').not().isEmpty(),
    validarCampos
], crearMaestro);

// Actualizar Producto - privado - se requiere id y un token valido
router.put('/editar/:id', [
    //validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeMaestroPorId ),
    check('nombre', 'El nombre del maestro es obligatorio').not().isEmpty(),
    validarCampos
], actualizarMaestro);

// Borrar una categoria - privado - se requiere id y un token valido - solo el admin puede borrar
router.delete('/eliminar/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeMaestroPorId ),
    validarCampos
], eliminarMaestro);

module.exports = router;