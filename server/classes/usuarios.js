

class Usuarios {

    constructor(){
        this.personas = []; //arreglo personas
    }

    agregarPersona(id, nombre, sala) {

        let persona = {
            id, 
            nombre,
            sala
        };

        this.personas.push(persona); //agregamos esta persona al arreglo crear

        return this.personas;  //todas las personas que estan en el chat
    }

    //obtener una persona por el id
    getPersona(id){

        let persona = this.personas.filter( persona => {
            return persona.id === id
        })[0]; //solo pido un registro por eso el 0 SI NO ENCUENTRA SERA UNDEFIGHT

        return persona;
    }

    //obtener a todas las personas
    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    //eliminar, remover del chat solo personas activas en el chat
    borrarPersona(id){ 

        let  personaBorrada = this.getPersona(id);

       this.personas = this.personas.filter( persona => persona.id != id); //borramos persona

        return personaBorrada;

    }

}

module.exports = {
    Usuarios
}