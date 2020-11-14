'use strict'

/* Leader: Importa el modelo "leader.js" */
var Leader = require('../models/leader');

/* fs: importa la libreria FileSystem "fs" */
var fs = require('fs');

/* path --> módulo que permite cargar rutas físicas de nuestro sistema de archivos */
var path = require('path');

/* controller: funciones del controlador
    saveLeader: guarda un elemento en la BD
    getLeader: obtiene un elemento de la BD
    getLeaders: lista todos los elementos de la BD
    updateLeader: actualiza un elemento de la BD
    deleteLeader: elimina un elemento de la BD
    uploadImage: sube un fichero de imagen a un elemento de la BD */
var controller = {

    /* Almacenas un elemento en la BD */
    saveLeader: function(req, res){
        var leader = new Leader();
        var params = req.body;
        //modificar los valores del objeto
        leader.name = params.name,
        leader.surname = params.surname,
        leader.phoneNumber = params.phoneNumber,
        leader.address = params.address,
        leader.email = params.email,
        leader.birthday = params.birthday,
        leader.image = null;

        //Guardar el objeto en la BD
        leader.save((err, leaderStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar en la BD'});
            if(!leaderStored) return res.status(404).send({message: 'No se ha podido guardar el miembro'});
            return res.status(200).send({leader: leaderStored});
        });
    },

    /* Obtener un elemento almacenado en la BD */
    getLeader: function(req, res){
        var leaderIdCode = req.params.id;
        Leader.findById( leaderIdCode, (err, leader) => {
            if(leader == null)return res.status(404).send({message: 'El miembro no existe'});
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!leader) return res.status(404).send({message: 'El miembro no existe'});
            return res.status(200).send({
                leader: leader
            });
        });
    },

    /* Obtener los elementos almacenados en la BD */
    getLeaders: function(req, res){
        Leader.find({}).exec( (err, leaders) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!leaders) return res.status(404).send({message: 'No hay miembros que mostrar'});
            return res.status(200).send({leaders: leaders});
        });
    },

    /* Modificar un elemento de la BD */
    updateLeader: function(req, res){
        var leaderIdCode = req.params.id;
        var update = req.body;

        /* @Params:
            leaderIdCode: el id del documento que se va a modificar
            update: los datos nuevos que se van a actualizar
            Callback para manejar errores y la ejecución del método */
        Leader.findByIdAndUpdate( leaderIdCode, update, {new:true}, (err, leaderUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar los datos'});
            if(!leaderUpdated) return res.status(404).send({message: 'No existe el miembro para actualizar'});
            return res.status(200).send({
                leader: leaderUpdated
            });
        });
    },

    /* Borrar un elemento de la BD */
    deleteLeader: function(req, res){
        //Variable para indicar cual objeto se va a eliminar
        var leaderIdCode = req.params.id;
        //@Params:
        //leaderIdCode: el id del documento que se va a eliminar
        //Callback para manejar errores y la ejecución del método
        Leader.findByIdAndDelete ( leaderIdCode,  (err, leaderDeleted) => {
            if(err) return res.status(500).send({message: 'Error al eliminar el documento'});
            if(!leaderDeleted) return res.status(404).send({message: 'No existe el miembro a eliminar'});
            return res.status(200).send({leader: leaderDeleted});
        });
    },
    /* Subir una imagen a la BD */
    uploadImage: function(req, res){
        var leaderIdCode = req.params.id;
        var fileName = 'Imagen no subida...';
        //Si existe la propiedad con los archivos que vamos a subir (req.files) se realiza la respuesta 
        if(req.files){
            //obtener el directorio donde se va a guardar el fichero o imagen
            var filePath = req.files.image.path;
            //sacar el nombre real del archivo que se ha guardado en el disco
            var fileSplit = filePath.split('/');
            //recoger el índice del “fileSplit” que es el nombre del archivo y se encuentra en el índice 1
            var fileName = fileSplit[1];
            //sacar la extensión del archivo que se va a guardar en disco
            var extSplit = fileName.split('.')
            //guardar la extensión del archivo que se ha sacado del Split()
            var fileExt = extSplit[1];

            //Condicional para verificar la extensiión del archivo que se va a cargar
            if( fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' ) {

                //@Params:
                //leaderIdCode: el id del documento que se va a modificar
                //{image: fileName}: propiedad 'image' que se guardará por medio del nombre 'fileName'
                //{new: true}: opción para que nos muestre el documento actualizado
                //Callback para manejar errores y la ejecución del método
                Leader.findByIdAndUpdate( leaderIdCode, {image: fileName}, {new: true},  (err, leaderUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
                    if(!leaderUpdated) return res.status(404).send( {message: 'El documento no existe y no se ha asignado'});
                    return res.status(200).send( {leader: leaderUpdated} );
                });

            }else{
                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({
                        message: 'La extensión no es válida'
                    });
                });
            }
        //en caso de que no entre al "req.files" devuelve un mensaje
        }else{
            return res.status(200).send({message: fileName});
        }
        
    },

    /* Método para obtener una imagen almacenada en la BD */
    getImageFile: function(req,res){
        // file --> el nombre del archivo que se pasará por la URL de la petición
        // path --> la ruta de la imagen
        var file = req.params.image;
        var path_file = './uploads/'+file;
        var exist = false;

        // Comprueba que el fichero existe
        /*fs.existsSync(path_file,(exist) =>{
            if(exist){
                console.log(path_file);
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        });*/

        exist = fs.existsSync(path_file)
            if(exist){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        ;
    }
};
//Exportar el módulo para usarlo en cualquier fichero
module.exports = controller;