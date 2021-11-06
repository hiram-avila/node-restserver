const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs'); 



const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
    
    console.log(usuariosGet);
}


async function usuariosPost (req, res = response)  {

    const { nombre, password, correo, rol } = req.body; 
    const usuario = new Usuario( { nombre, correo, password, rol } );
// console.log(existeRol)
 
            //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

  //const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

            //guardar en DB 
    await usuario.save(); 
    // console.log(usuario) 

    res.json({

        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}


const usuarioNo = (req, res ) => {
    res.send('jsjs')
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuarioNo,
}