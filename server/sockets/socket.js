const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');


const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (data, callback) => {

        //validaciones 
        if(!data.nombre || !data.sala){
            return callback({
                error: true,
                mensaje: 'El nombre o sala es necesario'
            });
        }

        //conectar un user a una sala
        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala) ); //to(data.sala) lo manda solo a una sala

        callback( usuarios.getPersonasPorSala(data.sala) ); //retorna personas que estan en la sala 

    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(data.nombre, data.mensaje); //con esto pasamos el mensaje y el usuario

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje); //enviamos el mensaje

    });


    client.on('disconnect', () => {

      let personaBorrada = usuarios.borrarPersona(client.id);
      //mandamos mensaje que se desconecto a la sala
      client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre } salio`));
      client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada) );//justo aqui 

    });


    //mensajes privados desde el servidor
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });




});