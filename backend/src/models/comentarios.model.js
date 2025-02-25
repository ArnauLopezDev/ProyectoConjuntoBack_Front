// models/Comentario.js
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI || `mongodb://root:root@mongo:27017/`;
const client = new MongoClient(uri);

// Nos conectamos una sola vez (esto puede mejorarse según el patrón de conexión de tu app)
client.connect();

const database = client.db("zoologico");
const comentariosCollection = database.collection("comentarios");



async function addComentario(comentario) {
    // Si no se envía la fecha, se asigna la fecha actual.
    if (!comentario.fecha_comentario) {
        comentario.fecha_comentario = new Date();
    }
    const result = await comentariosCollection.insertOne(comentario);
    return result.insertedId;
}

async function getComentarios(filtro = {}) {
    // Si se reciben parámetros de filtro (por ejemplo, tipo_referencia o id_referencia_sql)
    const comentarios = await comentariosCollection.find(filtro).toArray();
    return comentarios;
}

async function deleteComentario(idComentario) {
    const result = await comentariosCollection.deleteOne({ _id: new ObjectId(idComentario) });
    return result.deletedCount;
}

module.exports = {
    addComentario,
    getComentarios,
    deleteComentario,
};
