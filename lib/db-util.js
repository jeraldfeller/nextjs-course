import { MongoClient } from 'mongodb'


const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.okm3o2s.mongodb.net/${process.env.MONGODB_DATABASE}`

export async function connectDatabase(){
    const client = await MongoClient.connect(connectionString)
    return client
}

export async function insertDocument(client, collection, document){
    const db = client.db()
    const result = await db.collection(collection).insertOne(document)
    return result
}

export async function getAllDocuments(client, collection, sort, filter){
    const db = client.db()
    const documents = await db.collection(collection).find(filter).sort(sort).toArray()
    return documents
}