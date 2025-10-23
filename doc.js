const DOC = {
    mensaje: 'Hola GRUPO 6 desde Express + serverless-http en AWS LAMBDA 👋',
    uso: 'RUTAS HASTA EL MOMENTO',
    endpoints: {
      GET: '/carreras -> lista todas las carreras',
      POST: '/carrera -> crea nueva carrera (body: id, nombre, id_institucion_educativa, status, info_link(opcional))'
    },
    ejemploPostCarrera: {
      POST: '/carreras',
      body: {
        id: 15,
        nombre: 'Tecnicatura en Inteligencia Artificial y analisis de datos',
        id_institucion_educativa: 11,
        status: 'available',
        info_link: 'https://ifts11.edu.ar/ia'
      },
      nota: "recordar poner las comillas a los nombres de las propiedades"
    }
}

module.exports = DOC;