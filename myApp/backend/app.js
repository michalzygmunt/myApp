const express = require('express');
const bodyParser = require('body-parser');
const Comment = require('./models/comment');
const mongoose = require("mongoose");

const commentRoutes = require("./routes/comments")

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/myApp');

//on connection
mongoose.connection.on('connected',()=>{
    console.log('connected dto database eloeleoelo');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('ale ellol wyskocyl: ' + err);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) =>{
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
);
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS"
);
  next();
});

app.use("/api/comments",commentRoutes);



module.exports = app;
