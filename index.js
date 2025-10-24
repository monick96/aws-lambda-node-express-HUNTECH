//imports necesarios para aws
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const crypto = require('crypto');//paquete por defecto con node v>18 para UUID
const DOC = require('./doc');

const serverless = require('serverless-http');//el adaptador de expreess para lamda
// Lambda no escucha, solo ejecuta función por cada petición.
const express = require('express');
const app = express();
app.use(express.json());//parsea el body a json- midelware

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

// ---- CONFIG ----
//la tabla ahora es unica, aloja todas las entidades
//process.env es por si hay varios entornos
const TABLE_NAME = process.env.TABLE_NAME || 'plataforma';
const REGION = process.env.AWS_REGION || 'us-east-1';

//para credenciales 
const client = new DynamoDBClient({ region: REGION });
const dynamo = DynamoDBDocumentClient.from(client);

app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(json(DOC));
});

//obtener proyectos
app.get('/proyectos', async(req, res) => {
    try {

        res.setHeader('Content-Type', 'application/json');

        let params = {
            TableName: TABLE_NAME,
            FilterExpression: "begins_with(PK, :p)",
            ExpressionAttributeValues: {
                ":p": "PROYECTO#"
            }
        };

        comandoQueEntiendeDynamo = new ScanCommand(params);

        const result = await dynamo.send(comandoQueEntiendeDynamo);

        const proyectos = (result.Items || []).map(item => ({
            id: item.PK,                       
            nombre: item.nombre,
            descripcion: item.descripcion,
            info_link: item.info_link,
            buscando_devs: item.buscando_devs,
            contratos: item.contratos || [],
            gerente_id: item.gerente_id,
            created_at: item.created_at
        }));

        res.status(200)

        res.json({
            message: 'Proyectos obtenidos correctamente',
            count: proyectos.length,
            data: proyectos
        });

    } catch (err) {

        console.error('Error al obtener proyectos: ' + err);
        res.status(500)
        res.json({ error: 'Error al obtener Proyectos: '+ err.mensaje });

    }
});


// POST nuevo proyecto
app.post('/proyecto', async (req, res) => {
    try {

        const { nombre, descripcion, info_link, buscando_devs, gerente_id } = req.body;
        
        // Validaciones
        if (!nombre || !descripcion || !gerente_id) {
            res.status(400);
            res.json({ message: 'Campos obligatorios: nombre, descripcion, gerente_id' });
            return;
        }

        if (typeof buscando_devs !== 'boolean') {
            res.status(400);
            res.json({ message: "'buscando_devs' debe ser boolean (true o false)" });
            return ;
        }

        // ID proyecto
        const proyectId = crypto.randomUUID(); // Node 18+

        //Item DynamoDB
        const item = {
            PK: `PROYECTO#${proyectId}`,
            SK: 'METADATA',
            nombre,
            descripcion,
            info_link: info_link || '',
            buscando_devs,
            gerente_id,
            created_at: new Date().toISOString()
        };

        comandoQueEntiendeDynamo = new PutCommand({
            TableName: TABLE_NAME,
            Item: item,
            ConditionExpression: 'attribute_not_exists(PK)'//condicion para guardar en dynamo
        });

        //Guardar (evita sobrescribir si ya existe esa PK)
        await dynamo.send(comandoQueEntiendeDynamo);

        //Respuesta
        res.status(201)
        res.json({ message: 'Proyecto creado', proyectId });

    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ error: 'Error creando la carrera: ' + err.message });
    }
    
});


//inicia server y escucha solicitudes
//3 parametros=> puerto, hostname, callback
app.listen(PORT,HOSTNAME, () =>console.log(`El servidor esta corriendo en http://${HOSTNAME}:${PORT}`));

//exporta la funcion que lambda va a invocar 
module.exports.handler = serverless(app);