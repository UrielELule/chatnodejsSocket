const crearMensaje = (nombre, mensaje) => { //recibe un nombre y mensaje

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    };

}


module.exports = {
    crearMensaje
}