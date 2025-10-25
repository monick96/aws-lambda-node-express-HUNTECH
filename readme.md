# Este repo puede ejecutarse en local si tu cuenta AWS tiene las tablas con mismo nombre y tenes en tu pc las credenciales aws
## pasos
1. clonar repo
2. instalar paquetes y dependencias
```
 npm i
```
3. ejecutar
```
 npm index.js
```
4. Crear tabla unica con este comando en la terminal de AWS
```
aws dynamodb create-table \
  --table-name huntechApp \
  --attribute-definitions AttributeName=PK,AttributeType=S AttributeName=SK,AttributeType=S \
  --key-schema AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST

```
5. ### CRUD A TABLA DYNAMO EN nuestas credeciales  AWS desde local
-  en nuestra pc en windows en la ruta users/nuestroUser crear -> .aws/credentials y colocar ahi todo lo que aparece en aws details cuando levantamos el lab(las credenciales temporales)

#

## ESTOS PASOS QUE SIGUEN SOLO SI SE QUIERE DESPLEGAR LaMBDA CON API GATEGAY
# Pasos para desplegar una lambda con api gategay
1. clonar este repo 
2. Instalar dependencias
```
npm i
```
3. zipear todo(incluso node modules)

4. En AWS crear la lambda
AWS Console → Lambda → Crear funcion(crear desde cero, un nombre, node 22.x, arq x86) →crear funcion →en codigo subir el zip del paso anterior
Handler: index.handler

5. En AWS crear api gateway
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


#
- [metodos dynamo ](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)









###

###

borrar carpeta en bash(es una nota para mi)
```
rm -rf nombre-carpeta
```
