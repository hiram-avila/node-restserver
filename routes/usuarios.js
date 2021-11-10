
// const { Resolver } = require('dns');
const { Router } = require('express');
const { check } = require('express-validator');
// const { appendFile } = require('fs');

const { rol1, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');  





const { validarCampos } = require('../middlewares/validar-campos');


const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch, 
        usuarioNo} = require('../controllers/usuarios');
const { validarJWt } = require('../middlewares/validarJWT');
        

const router = Router();


router.get('/', usuariosGet );

router.get('/hola', (req, res )=>{   
    res.send('hola perro')
} );


router.put('/:id',[
    check('id', 'No es un ID valido ').isMongoId(), 
    check('id').custom ( existeUsuarioPorID ),
    // check('rol').custom( rol1 ),

    validarCampos
], usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Contraseña debe ser mayor a 6 letras').isLength({ min: 6}),
    check('correo', 'El correo noes valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( rol1 ),
    validarCampos
], usuariosPost );



router.delete('/:id',[
    validarJWt,
    check('id', 'No es un ID valido ').isMongoId(), 
    check('id').custom ( existeUsuarioPorID ),
    validarCampos,
], usuariosDelete );

router.patch('/', usuariosPatch );

router.get('/u', usuarioNo);




module.exports = router;