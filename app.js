const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const { connectToDB, getDB } = require('./db');
let db;

connectToDB((err) => {
    if(err){
        throw "Failed to start";
    }
    db = getDB();
    console.log("Successfully started");
    app.listen(3000, () => console.log("Listening at port 3000"));
});

app.get('/todos/', async (req, res) => {
    try{
        const data = await db.collection('todos').find().toArray();
        res.status(200).json(data);
    }
    catch(err){
        console.error('Database Fetch Failure - all documents');
        res.status(500).json({err: "Database Fetch Failure"});
    }
});