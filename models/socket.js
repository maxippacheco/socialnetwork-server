// const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
// const { comprobarJWT } = require("../helper/generar-jwt");

const { userOnline, userOffline, getUsersOnline, createMessage } = require("../controllers/sockets");
const {checkJWT} = require("../helpers/create-jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

   socketEvents() {
      // On connection
      this.io.on('connection', async( socket ) => {
			
        const [ isValid, uid ] = await checkJWT( socket.handshake.query.token );

        if( !isValid ){
            console.log('socket not valid');
        }

        await userOnline( uid );

        socket.join( uid );

        this.io.emit('users-online', await getUsersOnline() );


        socket.on('new-message', async( payload ) => {
            const message = await createMessage( payload );

            this.io.to( payload.from ).emit('new-message', message );
            this.io.to( payload.to ).emit('new-message', message );
        })

        socket.on('disconnect', async() => {
            await userOffline( uid );
            
            this.io.emit('users-online', await getUsersOnline() );
        })
      });
   }


}


module.exports = Sockets;