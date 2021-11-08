

const Usuario = require('../models/usuario');

const Role = require('../models/role');


const rol1 = async (rol = '' ) =>{
    const existeRol = await Role.findOne({ rol });

    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD` )
    }
    
} 


const emailExiste = async( correo = '' ) => {
    
    // const usuario = new Usuario( { nombre, correo, password, rol } );
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error (`El correo: ${ correo }, ya esta registrado`)
    }

}

const existeUsuarioPorID = async( id ) => {
    
    // const usuario = new Usuario( { nombre, correo, password, rol } );
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error (`el id no existe ${ id}`);
    }

}



module.exports = {
    rol1,
    emailExiste,
    existeUsuarioPorID
}