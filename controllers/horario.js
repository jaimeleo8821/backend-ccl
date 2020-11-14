'use strict'

/* Horario: Importa el modelo "models/horario.js" */
var Horario = require('../models/horario');


/* controller: funciones del controlador
    saveHorario: guarda un elemento en la BD
    getHorario: obtiene un elemento de la BD
    getHorario: lista todos los elementos de la BD
    updateHorario: actualiza un elemento de la BD
    deleteHorario: elimina un elemento de la BD
*/
var controller = {

    /* Almacenas un elemento en la BD */
    saveHorario: function(req, res){
        var horario = new Horario();
        var params = req.body;
        //modificar los valores del objeto
        horario.infoMiercoles = params.infoMiercoles,
        horario.infoViernes = params.infoViernes,
        horario.infoSabado = params.infoSabado,
        horario.infoDomingo = params.infoDomingo,

        //Guardar el objeto en la BD
        horario.save((err, horarioStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar en la BD'});
            if(!horarioStored) return res.status(404).send({message: 'No se ha podido guardar el horario'});
            return res.status(200).send({horario: horarioStored});
        });
    },

    /* Obtener un elemento almacenado en la BD */
    getHorario: function(req, res){
        var horarioId = req.params.id;
        Horario.findById( horarioId, (err, horario) => {
            if(horario == null)return res.status(404).send({message: 'Información de horario no existe'});
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!horario) return res.status(404).send({message: 'El horario no existe'});
            return res.status(200).send({
                horario: horario
            });
        });
    },

    /* Obtener todos los elementos almacenados en la BD */
    getHorarios: function(req, res){
        Horario.find({}).exec( (err, horarios) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!horarios) return res.status(404).send({message: 'No hay horarios que mostrar'});
            return res.status(200).send({horarios: horarios});
        });
    },

    /* Modificar un elemento de la BD */
    updateHorario: function(req, res){
        var horarioId = req.params.id;
        var update = req.body;

        /* @Params:
            horarioId: el id del documento que se va a modificar
            update: los datos nuevos que se van a actualizar
            Callback para manejar errores y la ejecución del método */
        Horario.findByIdAndUpdate( horarioId, update, {new:true}, (err, horarioUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar los datos'});
            if(!horarioUpdated) return res.status(404).send({message: 'No existe el horario para actualizar'});
            return res.status(200).send({
                horario: horarioUpdated
            });
        });
    },

    /* Borrar un elemento de la BD */
    deleteHorario: function(req, res){
        //Variable para indicar cual objeto se va a eliminar
        var horarioId = req.params.id;
        //@Params:
        //horarioId: el id del documento que se va a eliminar
        //Callback para manejar errores y la ejecución del método
        Horario.findByIdAndDelete ( horarioId,  (err, horarioDeleted) => {
            if(err) return res.status(500).send({message: 'Error al eliminar el documento'});
            if(!horarioDeleted) return res.status(404).send({message: 'No existe el miembro a eliminar'});
            return res.status(200).send({horario: horarioDeleted});
        });
    },

};
//Exportar el módulo para usarlo en cualquier fichero
module.exports = controller;