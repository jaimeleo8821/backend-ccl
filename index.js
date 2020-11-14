'use strict'

/* mongoose: variable para importar el módulo Mongoose */
var mongoose = require('mongoose');

/* app: variable para cargar el módulo "app" de express */
var app = require('./app');

/* port: variable para indicar el puerto del servidor "localhost:3700" */
var port = 3700;

/* Crear la conexión con la base de datos
{ useNewUrlParser: true } -> sirve para evitar el Warning de URL Parser 
{useUnifiedTopology: true} -> sirve para evitar el Warning de Server Discovery and Monitoring engine
mongoose.set('useFindAndModify', false) -> sirve para evitar Warning Mongoose: `findOneAndUpdate()` and `findOneAndDelete()`*/
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db_ccl', { useNewUrlParser: true, useUnifiedTopology: true })

//Comprobar que la promesa de conexión funciona
    .then(() => {
        console.log("+--------------------------------------+");
        console.log("|  Conexión a Base de Datos exitosa!   |");
        console.log("+--------------------------------------+");

        // Creación del servidor
        app.listen(port, () => {
            console.log("+-----------------------------------------------+");
            console.log("|  Servidor en ejecución en url: localhost:"+port+" |");
            console.log("+-----------------------------------------------+");
        })
    })
    .catch(err => console.log(err));