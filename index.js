//imports necesarios para aws
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const DOC = require('./doc');

const serverless = require('serverless-http');//el adaptador de expreess para lamda
// Lambda no escucha, solo ejecuta función por cada petición.
const express = require('express');
const app = express();
app.use(express.json());//parsea el body a json

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

//para credenciales //no necesito arn por que estoy en la politica de la tabla? mentira , necesito si os i llamar por arn por que no esta en mi cuenta
const client = new DynamoDBClient({ region: 'us-east-1' });
const dynamo = DynamoDBDocumentClient.from(client);

//la tabla
//const TABLE_NAME = 'arn:aws:dynamodb:us-east-1:734039142844:table/carrera';
const TABLE_NAME = 'carrera';

app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(DOC));
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
        res.send(JSON.stringify({ error: 'Error al obtener carreras: '+ err.mensaje }));

    }
});


// POST nueva carrera
app.post('/carreras', async (req, res) => {
    try {
        const { id, nombre, info_link, id_institucion_educativa, status } = req.body;

        if (!id || !nombre || !id_institucion_educativa || !status) {

            res.status(400);
            return res.send(JSON.stringify({ error: "faltan completar campos" }));
        }

        const item = {
            id,
            nombre,
            info_link: info_link || "",
            id_institucion_educativa,
            status
        };

        await dynamo.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));

        res.status(201);
        res.send(JSON.stringify({ mensaje: "Carrera creada correctamente", carrera: item }));

    } catch (err) {
        console.error(err);
        res.status(500);
        res.send(JSON.stringify({ error: 'Error creando la carrera: ' + err.message }));
    }
});


//inicia server y escucha solicitudes
//3 parametros=> puerto, hostname, callback
app.listen(PORT,HOSTNAME, () =>console.log(`El servidor esta corriendo en http://${HOSTNAME}:${PORT}`));

//exporta la funcion que lambda va a invocar 
module.exports.handler = serverless(app);