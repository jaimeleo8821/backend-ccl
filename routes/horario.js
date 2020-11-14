'use strict'

/* express: variable para cargar el módulo de Express */
var express = require('express');

/* HorarioController: variable para cargar el módulo del controlador */
var HorarioController = require('../controllers/horario');

/* router: variable para cargar el Router de Express */
var router = express.Router();


/* Ruta por 'POST' -> Ruta para guardar documentos en la BD
    @Params1 -> en nombre de la ruta '/save-horario’
    @Params2 -> use el objeto del controlador y su método 'saveHorario()' */
router.post('/save-horario', HorarioController.saveHorario);

/* Ruta por 'GET' -> Ruta para obtener datos de un elemento de la BD
    @Params1 -> en nombre de la ruta '/horario/:id’ que es obligatorio u opcional '/horario/:id?’
    @Params2 -> usa el objeto del controlador y su método 'getHorario()' */
router.get('/horario/:id?', HorarioController.getHorario);

/* Ruta por 'GET' -> Ruta para obtener el listado de documentos en la BD
    @Params1 -> el nombre de la ruta '/horarioss’
    @Params2 -> usa el objeto del controlador y su método 'getHorarios()' */
router.get('/horarios', HorarioController.getHorarios);

/* Ruta por 'PUT' -> Ruta para actualizar un documentos en la BD
    @Params1 -> el nombre de la ruta '/horario/:id’
    @Params2 -> usa el objeto del controlador y su método 'updateHorario()' */
router.put('/horario/:id', HorarioController.updateHorario);

/* Ruta por 'DELETE' -> Ruta para eliminar un documentos en la BD
    @Params1 -> el nombre de la ruta '/horario/:id’
    @Params2 -> usa el objeto del controlador y su método 'deleteHorario()' */
router.delete('/horario/:id', HorarioController.deleteHorario);


// Exportar el módulo del router para usar toda la configuración asociada a el
module.exports = router;