const serverless = require('serverless-http');//el adaptador de expreess para lamda
// Lambda no escucha, solo ejecuta función por cada petición.
const express = require('express');
const app = express();

//const HOSTNAME = '127.0.0.1';
//const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ mensaje: 'Hola GRUPO 6 desde Express + serverless-http en AWS LAMBDA 👋'}));
});

//inicia server y escucha solicitudes
//3 parametros=> puerto, hostname, callback
//app.listen(PORT,HOSTNAME, () =>console.log(`El servidor esta corriendo en http://${HOSTNAME}:${PORT}`));

//exporta la funcion que lambda va a invocar 
module.exports.handler = serverless(app);