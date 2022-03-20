// Servidor de Express
const express  = require('express');
const http     = require('http');
// const socketio = require('socket.io');
const path     = require('path');
const cors      = require('cors');
const { dbConnection } = require('../database/config');

// const Sockets  = require('./sockets');



class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;
        this.apiRoutes = {
          auth: '/api/auth',
          follow: '/api/follow'
        }

        // Conectar a DB
        dbConnection();

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        //   this.io = socketio( this.server, { /* configuraciones */ } );
		
		    this.middlewares();
        // Inicializar sockets
        //   this.configurarSockets();

    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        this.app.use(cors());

        this.app.use(express.json());

        // endpoints
        this.app.use( this.apiRoutes.auth, require('../routes/auth') );
        this.app.use( this.apiRoutes.follow, require('../routes/follow') );
      //   this.app.use( '/api/mensajes', require('../router/mensajes') );
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
   //  configurarSockets() {
   //      new Sockets( this.io );
   //  }


        // Inicializar Server

	listen(){
		this.server.listen( this.port, () => {
			console.log('Server corriendo en puerto:', this.port );
		});
	}


}


module.exports = Server;