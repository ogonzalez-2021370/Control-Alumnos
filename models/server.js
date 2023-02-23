//Configuración del server
//Importaciones básicas
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor(){
        //Variables de configuración
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.estudiantePath = '/api/estudiante';
        this.maestroPath = '/api/maestro';
        this.cursoPath = '/api/curso';
        this.usuarioPath = '/api/usuario';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //Rutas de mi app
        this.routes();

    }


    //Metodo de conección a Mongo
    async conectarDB(){
        await dbConection();
    }

    
    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico del proyecto
        this.app.use(  express.static('public') );

    }


    routes(){
        this.app.use( this.authPath , require('../routes/auth') );
        this.app.use( this.estudiantePath , require('../routes/estudiantes') );
        this.app.use( this.maestroPath , require('../routes/maestros') );
        this.app.use( this.cursoPath , require('../routes/cursos') );
        this.app.use( this.usuarioPath , require('../routes/usuario') );
        
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }


}



module.exports = Server;