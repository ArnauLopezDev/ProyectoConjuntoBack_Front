const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const database = client.db("zoologico");
const comentariosCollection = database.collection("comentarios");

async function addComentario(comentario) {
    const result = await comentariosCollection.insertOne(comentario);
    return result.insertedId;
}

async function getComentarios(filtro = {}) {
    const comentarios = await comentariosCollection.find(filtro).toArray();
    return comentarios;
}

async function deleteComentario(idComentario) {
    const result = await comentariosCollection.deleteOne({ _id: idComentario });
    return result.deletedCount;
}

module.exports = {
    addComentario,
    getComentarios,
    deleteComentario
};
