const { Router } = require('express');
const { check } = require('express-validator');

const { existeEstudiantePorId } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

//Controllers
const { obtenerEstudiantes,
        obtenerEstudiantePorId,
        crearEstudiante,
        actualizarEstudiante,
        eliminarEstudiante } = require('../controllers/estudiantes');

const router = Router();

// Obtener todas los productos - publico
router.get('/mostrar', obtenerEstudiantes);

// Obtener un producto por el id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeEstudiantePorId ),
    validarCampos
],obtenerEstudiantePorId);

// Crear Producto - privado - cualquier persona con un token valido
router.post('/agregar', [
    //validarJWT,
    check('nombre', 'El nombre del estudiante es obligatorio').not().isEmpty(),
    validarCampos
], crearEstudiante);

// Actualizar Producto - privado - se requiere id y un token valido
router.put('/editar/:id', [
    //validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeEstudiantePorId ),
    check('nombre', 'El nombre del estudiante es obligatorio').not().isEmpty(),
    validarCampos
], actualizarEstudiante);

// Borrar una categoria - privado - se requiere id y un token valido - solo el admin puede borrar
router.delete('/eliminar/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeEstudiantePorId ),
    validarCampos
], eliminarEstudiante);

module.exports = router;