const { response, request } = require("express");
const jwt = require('jsonwebtoken');


const validarJWt = (req = request, res = response, next) => {

    const token = req.header('x-token');
    // console.log(token)

    if(!token){
        return res.status(401).json({
            msg:'no hay token en la peticion'
        });
    }

   try {

        jwt.verify( token, process.env.SECRETORPRIVATEKEY)


    next();

       
   } catch (error) {
       console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })
   }
}

module.exports = { 
    validarJWt
}