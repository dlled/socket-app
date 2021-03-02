const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')( this.server );

        //Configuración de los sockets
        this.sockets()

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    sockets() {

        this.io.on('connection', socket => {
            console.log('Cliente conectado', socket.id);

            socket.on('disconnect', () => {
                console.log('Disconnecting client', socket.id);
            })

            socket.on('send-msg', ( payload ) => {
                const {msg, id} = payload;
                payload.serverMsg = 'Reenviado desde el server';
                console.log(`Mensaje enviado -- ClientId: ${id} msg: ${msg}`)

                this.io.emit('send-msg', payload)


            })
        })

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

        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}


module.exports = Server;