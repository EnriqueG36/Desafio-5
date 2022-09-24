//Desafio entregable 4: Motores de plantillas
//Archivo principal index.js contiene la configuracion del puerto y del servidor


// Intanciación del servidor-------------------------------------------------------------------------
const express = require('express');         //Importamos express
const path = require('path');
const {engine} = require('express-handlebars');
const apiRoutes = require('./routers/routers');

const PORT = process.env.PORT || 8080;      //Definimos el puerto

const app = express();

//Configuración del motor de plantilla para el uso de HANDLEBARS
//Comentar al usar PUG o EJS

    app.engine('hbs', engine({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: path.resolve(__dirname, './views/layouts'),
        partialsDir: path.resolve(__dirname, './views/partials')
    }));



app.set('views','./views');                 //Indicamos a express la ruta de nuestra plantilla
app.set('view engine', 'hbs');              //Indicamos a express el motor de plantillas a usar, cambiar por pug, ejs, hbs etc


// Middlewares---------------------------------------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

//Routes --------------------------------------------------------------------------------------------
app.use('/api', apiRoutes);                 //Ruta a routers.js con prefijo /api



//Ejecución del metodo listen------------------------------------------------------------------------

//Log que nos indica que el servidor está corriendo
const connectedServer = app.listen(PORT, () => {
    console.log (`El servidor está listo y corriendo en el puerto ${PORT}`);
})

//En caso de erro, mostrar 
connectedServer.on('error',(error) => {
    console.log(error.message);
})
