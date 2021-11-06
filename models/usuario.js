
const {Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre el obligatoria']
    },

    correo:{
        type: String,
        required: [true, 'El correo el obligatoria'],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'La conatraseña es obligatoria']  
    },

    img:{ 
        type: String,
    },
    
    rol:{
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'user_role' ]
    },

    estado:{
        type: Boolean,
        default: true
    },

    google:{
        type: Boolean,
        default: false
    }

}); 

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );