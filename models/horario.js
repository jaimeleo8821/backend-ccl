'use strict'

/* mongoose: carga el módulo Mongoose */
var mongoose = require('mongoose');

/* Schema: define el esquema */
var Schema = mongoose.Schema;

/* HorarioSchema: objeto molde en el cual se van a crear nuevos documentos en la BD */
var HorarioSchema = Schema({
    infoMiercoles: String,
    infoViernes: String,
	infoSabado: String,
	infoDomingo: String,
});

/* Exporta el módulo
    @Params1: 'Horario' - nombre de la entidad
    @Params2: HorarioSchema - esquema de la entidad */
module.exports = mongoose.model('Horario', HorarioSchema);