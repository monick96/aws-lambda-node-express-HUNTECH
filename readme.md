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
##
## Pasos para hacer actualización de backend desde el CLI del Laboratorio de AWS
#### (esto por que tenemos credenciales temporales y cambian todo el tiempo) Para estos pasos va requerir que configures lambda en tu cuenta (pasos arriba)
## 1. Levantar laboratorio con start lab
## 2. En la CLI del lab Clonar este repositorio

git clone https://github.com/monick96/aws-lambda-node-express-prueba

```
cd aws-lambda-node-express-prueba
```
```
npm install
```
muy importante el punto al final
```
zip -r lambdaHuntech.zip .
```
```
aws lambda update-function-code --function-name NOMBRE_DE_TU_FUNCION_LAMBDA --zip-file fileb://lambdaHuntech.zip
```



#
### para correr el .sh 

```
git clone https://github.com/monick96/aws-lambda-node-express-prueba

```

```
cd aws-lambda-node-express-prueba
```
dar permisos de ejecución
```
chmod +x actualizarLambda.sh
```
ejecutar
```
./actualizarLambda.sh
```

### GET A TABLA DYNAMO EN OTRA CUENTA AWS en local
-nuestras cuentas tienen arn para verlo es ```aws sts get-caller-identity``` en cli de aws. Ese arn de mi usuario lo pusimos en la politica de la tabla carrera.. [politica](./polici.json)
- en la consola , en cada tabla se debe otorgar acceso con politica de tabla a las cuentas permitidas a acceder.... 
-  en nuestra pc en windows en la ruta users/ crear -> .aws/credentials y colocar ahi todo lo que aparece en aws details cuando levantamos el lab(las credenciales temporales)
- en el proyecto instale: 
    - **@aws-sdk/client-dynamodb**
    - **@aws-sdk/lib-dynamodb**

- con esa librerias que toman las credenciales que guarde, accedo a la tabla que me compartieron, la llamo por arn (la arn no es un dato sensible, por que por mas que lo intentes acceder si no estas en las politicas no deberia dejarte ver la info de la tabla)
- [metodos dynamo ](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
