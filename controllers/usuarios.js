const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs'); 



const usuariosGet = async(req = request, res = response) => {

    const { desde = 0, limite = 5 } = req.query;
    const usuarios = await Usuario.find()
        .skip(Number( desde ))
        .limit(Number(limite))

    res.json({
            usuarios
    });
    
    console.log(usuariosGet);
}


async function usuariosPost (req, res = response)  {

    const { nombre, password, correo, rol } = req.body; 
    const usuario = new Usuario( { nombre, password, correo,  rol } );
// console.log(existeRol)
 
            //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

  //const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

  console.log(usuario)

            //guardar en DB 
    await usuario.save(); 
    // console.log(usuario) 

    res.json({

        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, correo, google, ...resto } = req.body; 

    if ( password ) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);
    console.log(usuario)

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {
   
    const { id } = req.params;

        //borrar directamente a base de datos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false})

    res.json({
        usuario
    })
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