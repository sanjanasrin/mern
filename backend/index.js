
const { query } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const { aggregate } = require('./models');
const Post = require('./models')
const bodyParser = require('body-parser')


const app = express();

var body={"Date":new Date().toLocaleDateString('en-GB')}
var s1=new Date().toLocaleDateString('en-GB')
var s2=new Date().toLocaleDateString('en-GB')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/mydatabase")
    .then(() => {
        console.log("Connected to Database....");
    })
    .catch(() => {
        console.log("Failed to connect database....")
    })

app.use(express.json());
const axios = require('axios');




app.listen(4000, () => {
    console.log("Server Started at ${4000}" )
}) 


app.get('/get', (req, res, next) => {
    Post.find().then(documents => {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(
            // console.log(documents),
            // message: 'Database Data are',
            // posts: documents
            documents
        );
    });
})

app.get('/firsttable', (req, res, next) => {
    Post.find({"Date":{"$gte":(new Date()).toLocaleDateString('en-GB')},Health: "0"}).then(documents => {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(
            // console.log(documents),
            // message: 'Database Data are',
            // posts: documents
            documents
        );
    });
})

app.get('/gets', (req, res, next) => {            //return records wit health 0
    var query={Health: "0" };
    Post.find(query).then(documents => {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(
            // console.log(documents),
            // message: 'Database Data are',
            // posts: documents
            documents
        );
    });
})



app.get('/getsok', (req, res, next) => {              //return records wit health 1
    Post.find({"Date":{"$gte":(new Date()).toLocaleDateString('en-GB')},Health: "1"}).then(documents => {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(
            // console.log(documents),
            // message: 'Database Data are',
            // posts: documents
            documents
        );
    });
})

app.get('/getsnoofdata', (req, res, next) => {          //return all records
    Post.countDocuments({"Date":{"$gte":(new Date()).toLocaleDateString('en-GB')}}).then(documents => {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(
            // console.log(documents),
            // message: 'Database Data are',
            // posts: documents
            documents
        );
    });
})




app.get('/getsdates', (req, res, next) => {          //return all records
    Post.aggregate([
        {$group : {_id:"$Date", count:{$sum:1}}}
    ]).then(documents => {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(
            // console.log(documents),
            // message: 'Database Data are',
            // posts: documents
            documents
        );
    });
})

app.get('/getsdates1', (req, res, next) => {          //return all records
    Post.aggregate([
        {$group : {_id:"$Date", Date:{$last:"$Date"},Company:{$max:"$Company"}}},
        {$project: { Company : 1,Date:1 }}
    ]).then(documents => {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(
            // console.log(documents),
            // message: 'Database Data are',
            // posts: documents
            documents
        );
    });
})
app.get('/get/:id', (req, res, next) => {
    console.log(req.params.id)
    Post.findById(req.params.id).then(documents => {
        // res.status(200).json({
        //     // title: 'Database Data are',
        //     title:documents
        //     // documents
        // });
        res.status(200).json(documents);
        // res.query.title;
    });
})

app.get('/last', (req, res, next) => {
    var query=Post.find({}).sort({_id:-1}).limit(1).then(documents => {
        res.status(200).json(
            // message: 'Database Data are',
            // posts: documents
            documents[0]
        );
    });
})

app.post("/posts", (req, res) => {
    body = req.body;
    res.send(body)
});

app.get('/yes', (req, res, next) => {
  //var query=(body.Date);
    const var1=body.date
    s1=new Date(var1[0])
    s2=new Date(var1[1])
    s1=s1.toLocaleDateString('en-GB')
    s2=s2.toLocaleDateString('en-GB')
    Post.aggregate(
        [{$match:{Health:"1",Date:{$gte : s1, $lte : s2}}},
        {$group:{_id:"$Date", count:{$sum:1}}},
        { $sort : { _id : 1 } }]).then(documents => {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(
            // console.log(documents),
            // message: 'Database Data are',
            // posts: documents
            documents
        );
    });
})






  






