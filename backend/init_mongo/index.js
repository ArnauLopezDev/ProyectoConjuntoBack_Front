// const { MongoClient } = require("mongodb");


// async function main() {
//     const uri = "mongodb://localhost:27017"; // Cambiar esto si se cambia
//     const client = new MongoClient(uri);

//     try {
//         // Conectar al cliente
//         await client.connect();

//         // Seleccionar la base de datos
//         const database = client.db("zoologico");

//         // Crear la colección
//         const comentariosCollection = database.collection("comentarios");

//         // Crear un índice
//         await comentariosCollection.createIndex(
//             { id_usuario_sql: 1, id_referencia_sql: 1 },
//             { name: "usuario_referencia_idx" }
//         );
//         db,use 
//         // Insertar un documento ejemplo
//         const comentarioEjemplo = {
//             id_usuario_sql: 101,
//             id_referencia_sql: 205,
//             tipo_referencia: "animal",
//             contenido: "¡El león Simba es impresionante! ¿Tiene un horario específico para verlo?",
//             fecha_comentario: new Date("2025-01-20T14:23:00Z"),
//             respuestas: [
//                 {
//                     id_usuario_sql: 102,
//                     contenido: "Sí, suele estar activo entre las 10:00 y las 14:00.",
//                     fecha_respuesta: new Date("2025-01-20T15:00:00Z")
//                 }
//             ]
//         };

//         const result = await comentariosCollection.insertOne(comentarioEjemplo);
//         console.log(`Documento insertado con el ID: ${result.insertedId}`);
//     } catch (err) {
//         console.error("Error al trabajar con MongoDB:", err);
//     } finally {
//         // Cerrar la conexión
//         await client.close();
//     }
// }

// main().catch(console.error);

db = db.getSiblingDB('zoologico');
db.createCollection('comentarios');
db.comentarios.insertMany([
    {
        id_usuario_sql: 101,
        id_referencia_sql: 205,
        tipo_referencia: "animal",
        contenido: "¡El león Simba es impresionante! ¿Tiene un horario específico para verlo?",
        fecha_comentario: new Date("2025-01-20T14:23:00Z"),
        respuestas: [
            {
                id_usuario_sql: 102,
                contenido: "Sí, suele estar activo entre las 10:00 y las 14:00.",
                fecha_respuesta: new Date("2025-01-20T15:00:00Z")
            }
        ]
    },
    {
        id_usuario_sql: 103,
        id_referencia_sql: 301,
        tipo_referencia: "evento",
        contenido: "¿El show de delfines tiene límite de aforo?",
        fecha_comentario: new Date("2025-02-05T10:45:00Z"),
        respuestas: [
            {
                id_usuario_sql: 104,
                contenido: "Sí, solo pueden entrar 100 personas por sesión.",
                fecha_respuesta: new Date("2025-02-05T11:10:00Z")
            }
        ]
    },
    {
        id_usuario_sql: 105,
        id_referencia_sql: 205,
        tipo_referencia: "animal",
        contenido: "¿Cuánto vive un león en cautiverio?",
        fecha_comentario: new Date("2025-02-07T16:30:00Z"),
        respuestas: [
            {
                id_usuario_sql: 106,
                contenido: "Aproximadamente 15 a 20 años en buenas condiciones.",
                fecha_respuesta: new Date("2025-02-07T17:00:00Z")
            },
            {
                id_usuario_sql: 107,
                contenido: "En algunos zoológicos con buen cuidado, pueden vivir hasta 25 años.",
                fecha_respuesta: new Date("2025-02-07T17:15:00Z")
            }
        ]
    }
]);