const express = require('express');
const port = 8080;
const app = express();
const db = require('./config/db');
app.use(express.urlencoded());
app.use(express.json());
app.use('/',require('./routes')); 
app.listen(port,(err)=>{
    if(err){
        console.log("Server is not start");
        return false;
    }
    console.log("Server is  start on port :- "+port);
})