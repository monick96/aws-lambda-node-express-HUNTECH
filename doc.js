const DOC = {
    mensaje: 'Hola GRUPO 6 desde Express + serverless-http en AWS LAMBDA 👋',
    uso: 'RUTAS HASTA EL MOMENTO - Son los métodos de Mati adaptados a express ',
    endpoints: {
      GET: '/proyectos -> lista todas las proyectos',
      POST: '/proyecto -> crea nueva carrera (body: id, nombre, id_institucion_educativa, status, info_link(opcional))'
    },
    ejemploPostCarrera: {
      POST: '/proyecto',
      body: {
        nombre: "Matecito",
        descripcion: "Aplicación web y móvil para venta de mates y accesorios. Permite a los usuarios comprar, personalizar y seguir sus pedidos. Incluye panel para administradores de tiendas TodoModa.",
        info_link: "https://www.matecito.com",
        buscando_devs: true,
        gerente_id: "MAN#123"
      },
      respuestaExito:{ 
        message: "Proyecto creado", 
        proyectId: "10486a57-9717-4903-b402-199356b7ce7b" 
      },
      notas: [
        "Recordar poner las comillas a los nombres de las propiedades.",
        "Todavía no existe validación de roles, así que en gerente_id puede ir cualquier string."
      ]
    }
  }


module.exports = DOC;