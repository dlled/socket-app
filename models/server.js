const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            
        }

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    routes() {
    
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'));
        
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}


module.exports = Server;