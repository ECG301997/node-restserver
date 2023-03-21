const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria,obtenerCategorias,obtenerCategoria } = require('../controllers/categorias.controller');
const { validarJWT, validarCampos } = require('../middlewares/');
const { existeCategoriaPorId } = require('../helpers/db-validators')

const router = Router();

/*
 * {{url}}/api/categorias 
*/

// Obtener todas las categorias -- publico
router.get('/',obtenerCategorias);

// Obtener una categoria por id -- publico
router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria);

// Crear categoria -- privado -- cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('name','El nombre es obligatorio').notEmpty(),
    validarCampos
],crearCategoria);

// Actualizar -- privado -- cualquier persona con un token válido
router.put('/:id',(req, res) => {
    res.json('put')
});


// Borrar una categoria -- Admin
router.delete('/:id',(req, res) => {
    res.json('delete')
});


module.exports = router;