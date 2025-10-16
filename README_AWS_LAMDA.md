# Hacer un server express compatible con lamda SIN CLI
 ## 1. Instalar dependencias
```
npm init -y
npm install express 
npm install serverless-http
```
## 2. Crear index.js

## 3. zipear todo(incluso node modules)

## 4. En AWS crear la lambda
AWS Console → Lambda → Crear funcion(crear desde cero, un nombre, node 22.x, arq x86) →crear funcion →en codigo subir function.zip
Handler: index.handler

## 5. En AWS crear api gateway
AWS Console → api gateway → crear api, http api, poner nombre, asociar a nombre de api que creamos , implementacion por default → crear ruta , asociar  a la lambda → crear.

## Pasos para hacer actualización de backend desde el CLI del Laboratorio de AWS
### (esto por que tenemos credenciales temporales y cambian todo el tiempo) va requerir que configures lambda en tu cuenta (pasos arriba)
## 1. Levantar laboratorio con start lab
## 2. En la CLI del lab Clonar este repositorio

git clone https://github.com/monick96/aws-lambda-node-express-prueba

```
cd aws-lambda-node-express-prueba
```
```
npm install
```
```
zip -r lambdaHuntech.zip
```
```
aws lambda update-function-code --function-name NOMBRE_DE_TU_FUNCION_LAMBDA --zip-file fileb://lambdaHuntech.zip
```