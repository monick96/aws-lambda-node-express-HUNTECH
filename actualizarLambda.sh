
#!/bin/bash
#Despliegue de back en lambdapor sript .sh

REPO_URL="https://github.com/monick96/aws-lambda-node-express-prueba"
REPO_DIR="aws-lambda-node-express-prueba"
ZIP_NAME="lambdaHuntech.zip"
LAMBDA_FUNCTION_NAME="lambda-express-prueba"

echo "Preparando despliegue Lambda..."

# Verificar si el repositorio ya existe, si existe un pull
if [ -d "$REPO_DIR" ]; then
  echo "Repositorio ya existe. Haciendo pull..."
  cd "$REPO_DIR" || exit
  git pull
else
  echo "Clonando repositorio..."
  git clone "$REPO_URL"
  cd "$REPO_DIR" || exit
fi

echo "Instalando dependencias..."
npm install

echo "Creando archivo ZIP..."
zip -r "$ZIP_NAME" . 

echo "Subiendo código a Lambda..."
aws lambda update-function-code \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --zip-file "fileb://$ZIP_NAME"

echo "Despliegue completado!"

# Volver al directorio padre
cd ..

# Eliminar carpeta del cli de aws
echo "Eliminando carpeta del repositorio..."
rm -rf "$REPO_DIR"

echo "Script finalizado."