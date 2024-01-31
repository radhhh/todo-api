const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const validate = require('./validation');
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

app.use(express.json());

app.get('/todos/', async (req, res) => {
    try{
        const todos = await db.collection('todos').find().toArray();
        res.status(200).json(todos);
    }
    catch(err){
        console.error('Database Fetch Failure - All Documents', err);
        res.status(500).json({error: "Database Fetch Failure"});
    }
});

app.post('/todos/', async (req, res) => {
    const todo = req.body;
    console.log(todo);
    try{
        const validatedTodo = validate(todo);
        if(validatedTodo === undefined) throw "Invalid Body";

        const report = await db.collection('todos').insertOne(validatedTodo);
        res.status(201).json(report);
    }
    catch(err){
        console.error('Database Insert Failure - Single Document:', err);
        res.status(500).json({error: "Database Insert Failure"});
    }
})

app.get('/todos/:id', async (req, res) => {
    try{
        const todo = await db.collection('todos').findOne({_id: new ObjectId(req.params.id)});
        res.status(200).json(todo);
    }
    catch(err){
        console.error('Database Fetch Failure - Single Documents', err);
        res.status(500).json({error: "Database Fetch Failure"});
    }
});