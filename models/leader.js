'use strict'

/* mongoose: carga el módulo Mongoose */
var mongoose = require('mongoose');

/* Schema: define el esquema */
var Schema = mongoose.Schema;

/* LeaderSchema: objeto molde en el cual se van a crear nuevos documentos en la BD */
var LeaderSchema = Schema({
    name: String,
    surname: String,
	phoneNumber: Number,
	address: String,
	email: String,
	birthday: String,
	image: String
});

/* Exporta el módulo
    @Params1: 'Leader' - nombre de la entidad
    @Params2: LeaderSchema - esquema de la entidad */
module.exports = mongoose.model('Leader', LeaderSchema);