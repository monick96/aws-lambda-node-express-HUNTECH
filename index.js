//imports necesarios para aws
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const serverless = require('serverless-http');//el adaptador de expreess para lamda
// Lambda no escucha, solo ejecuta función por cada petición.
const express = require('express');
const app = express();

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

//para credenciales //no necesito arn por que estoy en la politica de la tabla? mentira , necesito si os i llamar por arn por que no esta en mi cuenta
const client = new DynamoDBClient({ region: 'us-east-1' });
const dynamo = DynamoDBDocumentClient.from(client);

//la tabla
const TABLE_NAME = 'arn:aws:dynamodb:us-east-1:734039142844:table/carrera';

app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ mensaje: 'Hola GRUPO 6 desde Express + serverless-http en AWS LAMBDA 👋'}));
});

//obtener carreras
app.get('/carreras', async(req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const carreras = await dynamo.send(new ScanCommand({ TableName: TABLE_NAME }));
        res.status(200)
        res.send(JSON.stringify({ carreras: carreras.Items }));

    } catch (err) {

        console.error(err);

        res.status(500)
        res.send(JSON.stringify({ error: 'Error al obtener carreras'+ err.mensaje }));

    }
});

//inicia server y escucha solicitudes
//3 parametros=> puerto, hostname, callback
app.listen(PORT,HOSTNAME, () =>console.log(`El servidor esta corriendo en http://${HOSTNAME}:${PORT}`));

//exporta la funcion que lambda va a invocar 
module.exports.handler = serverless(app);