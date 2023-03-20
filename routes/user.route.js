
const { Router } = require('express');
const { check } = require('express-validator');


// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')
const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares/')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/users.controller');

const router = Router()


router.get('/', usuariosGet);

router.put('/:id',[
    check('id','No es id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de contener mas de 6 caracteres').isLength({min:6}),
    check('email').custom( emailExiste ),
    // check('role','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;