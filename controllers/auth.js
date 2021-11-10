const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    
    try {

            //verificar que exista el email
        const usuario = await Usuario.findOne({ correo :correo});
        // console.log(usuario)
        
         if( !usuario){
            return res.status(400).json({
                msg: 'Usuario o passworrd no son correctos'
            })
        }

            //si el usuario  esta activo
          if( !usuario.estado){
                return res.status(400).json({
                    msg: 'Estado esta en FALSE'
                })
            }
    

            //verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
         if(!validPassword){
             return res.status(400).json({
                 msg: 'Password no correcto'
             });
         }
            //generar el JWT

        const token = await generarJWT( usuario.id );
         
        res.json ({
            usuario,
            token 
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'hable con el admin'
        });
    }
}


module.exports = { 
    login
}