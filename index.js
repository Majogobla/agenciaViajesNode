// Como se hacia antes que no se soportara el import, se le llama comondjs
// const express = require("express");

// Ahora expres da soporte a los imports
import express from "express";
import router from "./routes/index.js";
import db from './config/db.js';

const app = express();

// Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next) =>
{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de viajes';
    return next();
});

// Agregar body parse para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta public
app.use(express.static('public'));

// Agregar router
app.use('/', router)

app.listen(port, () =>
{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});