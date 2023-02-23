//importaciones
const { Router } = require('express');
const { getCurso, postCurso, putCurso, deleteCurso } = require('../controllers/cursos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/mostrar', getCurso);

router.post('/agregar',
    validarCampos,
    postCurso);

router.put('/editar/:id', [
    validarCampos

], putCurso);

router.delete('/eliminar/:id',
    validarCampos
    , deleteCurso);

module.exports = router;