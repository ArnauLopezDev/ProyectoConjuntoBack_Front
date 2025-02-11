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