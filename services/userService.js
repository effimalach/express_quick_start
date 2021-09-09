const fs = require('fs');  
var ObjectId = require('mongodb').ObjectId;
const {usersCollection}=require('../db.js');

/*
    given an interface of user (from above) make the following functions:
    add, delete, get, update
*/

async function getAll() {
    return await usersCollection().find({}).toArray();
}

async function getUser(id) {
    const users = usersCollection(); 
    console.log(users)
    const foundUser = await users.findOne({"_id":ObjectId(id)});
    return foundUser;
}

async function addUser(newUser) {
   await usersCollection().insertOne(newUser);
}

async function deleteUserFromDB(idToDeleteUser) {
    await usersCollection().deleteOne( { "_id" : ObjectID(idToDeleteUser)});
}


async function updateUserFromDB(idToUpdate,dataToUpdate) {
    var myquery = {"_id":ObjectID(idToUpdate)};
    var newvalues = { $set: {name:dataToUpdate.name, email:dataToUpdate.email, password:dataToUpdate.password } };
     const updated = await usersCollection().updateOne(myquery,newvalues);
}



module.exports = {
    getAll,
    getUser,
    deleteUserFromDB,
    updateUserFromDB,
    addUser
}









