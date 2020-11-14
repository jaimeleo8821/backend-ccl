'use strict'

/* express: carga el módulo de Express y Body-Parser
   bodyparser: carga el módulo Body-Parser */
var express = require('express');
var bodyParser = require('body-parser');

/* app: variable para ejecutar express */
var app = express();

/* leader_routes: carga archivos de Rutas */
var leader_routes = require('./routes/leader');
var horario_routes = require('./routes/horario');

/* Middlewares: para convertir las peticiones por POST en un objeto ".JSON" */
app.use(bodyParser.urlencoded({extended: false})); //configuración necesaria para el método Parser
app.use(bodyParser.json());

/* Configuración de Cabeceras y CORS - para que no fallen las peticiones */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Configuración de Rutas
app.use('/api', leader_routes, horario_routes);


// Exportar el módulo
module.exports = app;