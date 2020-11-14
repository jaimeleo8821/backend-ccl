'use strict'

/* express: variable para cargar el módulo de Express */
var express = require('express');

/* LeaderController: variable para cargar el módulo del controlador */
var LeaderController = require('../controllers/leader');

/* router: variable para cargar el Router de Express */
var router = express.Router();

/* multipart: variable para cargar el módulo "connect-multiparty" */
var multipart = require('connect-multiparty');

/* multipartMiddleware: variable para definir la ruta donde se guardaran los ficheros */
var multipartMiddleware = multipart( { uploadDir: './uploads' } );

/* Ruta por 'POST' -> Ruta para guardar documentos en la BD
    @Params1 -> en nombre de la ruta '/save-leader’
    @Params2 -> use el objeto del controlador y su método 'saveLeader()' */
router.post('/save-leader', LeaderController.saveLeader);

/* Ruta por 'GET' -> Ruta para obtener datos de un elemento de la BD
    @Params1 -> en nombre de la ruta '/leader/:id’ que es obligatorio u opcional '/leader/:id?’
    @Params2 -> usa el objeto del controlador y su método 'getLeader()' */
router.get('/leader/:id?', LeaderController.getLeader);

/* Ruta por 'GET' -> Ruta para obtener el listado de documentos en la BD
    @Params1 -> el nombre de la ruta '/leaders’
    @Params2 -> usa el objeto del controlador y su método 'getLeaders()' */
router.get('/leaders', LeaderController.getLeaders);

/* Ruta por 'PUT' -> Ruta para actualizar un documentos en la BD
    @Params1 -> el nombre de la ruta '/leader/:id’
    @Params2 -> usa el objeto del controlador y su método 'updateLeader()' */
router.put('/leader/:id', LeaderController.updateLeader);

/* Ruta por 'DELETE' -> Ruta para eliminar un documentos en la BD
    @Params1 -> el nombre de la ruta '/leader/:id’
    @Params2 -> usa el objeto del controlador y su método 'deleteLeader()' */
router.delete('/leader/:id', LeaderController.deleteLeader);

/* Ruta por 'POST' -> Ruta para subir un fichero o imagen a un documentos en la BD
    @Params1 -> el nombre de la ruta '/leader/:id’
    @Params2 -> carga el middelware en la ruta para su ejecución antes del método
    @Params3 -> usa el objeto del controlador y su método 'uploadImage()' */
router.post('/upload-image/:id', multipartMiddleware,  LeaderController.uploadImage);

/* Ruta por 'GET' -> Ruta para obtener una imagen almacenado en la BD
    @Params1 -> el nombre de la ruta '/get-image/’ más la ruta de la imagen
    @Params2 -> usa el objeto del controlador y su método 'getImageFile()' */
router.get('/get-image/:image', LeaderController.getImageFile);

// Exportar el módulo del router para usar toda la configuración asociada a el
module.exports = router;