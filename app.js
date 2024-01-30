const express = require('express');
const app = express();
const { ObjectId } = require('mongodb');
const { connectToDB, getDB } = require('./db');

connectToDB((err) => {
    if(err){
        console.log("failed", err);
        throw "Failed to start";
    }    
});

const db = getDB();