
// const { Resolver } = require('dns');
const { Router } = require('express');
const { check } = require('express-validator');
// const { appendFile } = require('fs');

const { rol1, emailExiste } = require('../helpers/db-validators');  





const { validarCampos } = require('../middlewares/validar-campos');


const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch, 
        usuarioNo} = require('../controllers/usuarios');
        

const router = Router();


router.get('/', usuariosGet );

router.get('/hola', (req, res )=>{   
    res.send('hola perro')
} );


router.put('/:id', usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Contraseña debe ser mayor a 6 letras').isLength({ min: 6}),
    check('correo', 'El correo noes valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( rol1 ),
    validarCampos
], usuariosPost );



router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );

router.get('/u', usuarioNo);




module.exports = router;