const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri);
let users;
let coupons;


async function connect() {
    await client.connect();
    console.log('mongo is connected')

    const database = client.db('mongo-first');
    users = database.collection('users');
    coupons = database.collection('coupons');

    
}

function usersCollection() {
    return users;   
}

function couponsCollection() {
    return coupons;   
}

module.exports = {
    connect,
    usersCollection,
    couponsCollection
}