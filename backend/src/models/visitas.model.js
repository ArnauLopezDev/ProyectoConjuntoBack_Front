const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI || `mongodb://root:root@mongo:27017/`;
const client = new MongoClient(uri);

// Nos conectamos una sola vez (esto puede mejorarse según el patrón de conexión de tu app)
client.connect();
const database = client.db("zoologico");
const visitasCollection = database.collection("accesos");

async function addVisita(visita) {
    const result = await visitasCollection.insertOne(visita);
    return result.insertedId;
}

async function getVisitas(filtro = {}) {
    const visitas = await visitasCollection.find(filtro).toArray();
    return visitas;
}
module.exports = {
    addVisita,
    getVisitas,
};