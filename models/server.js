const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        //conectar a base de datos
        this.conectarDb()

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();  
    }

    async conectarDb(){
        await dbConnection(); 
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.authPath, require('../routes/auth'));
               //manejar rutas no existentes
               
            this.app.get('/masc', (req, res) => {
                 res.send('mascotas')
             }) 
                
            this.app.get('*', (req, res) => {
                res.send('no hay nada pedazo')
             }) 
     }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
