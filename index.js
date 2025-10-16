const serverless = require('serverless-http');//el adaptador de expreess para lamda
// Lambda no escucha, solo ejecuta función por cada petición.
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hola GRUPO 6 desde Express + serverless-http en AWS LAMBDA 👋</h1>');
});

//exporta la funcion que lambda va a invocar 
module.exports.handler = serverless(app);