//nodejs
//javascript
//servers

//import the modules
//require() function used to import the modules
//require() function is the predefined function in  nodejs
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");


//create the rest object
const app = express();
//where "app" is the rest object
//"app" object used to develop the rest services
//Ex. GET POST PUT DELETE


//set the json as MIME Type
app.use(bodyparser.json());


//enable the cors policy
app.use(cors());

//accept the data from client application and parse it
app.use(bodyparser.urlencoded({extended:false}));


//create the client ref
//client object used to connect to database
const ashokIT = mongodb.MongoClient;
//where "ashokIT" is the reference object
//where "ashokIT" used to connect to mongodb database


//create the GET Request
app.get("/api/products",(req,res)=>{
    ashokIT.connect(`mongodb+srv://admin:admin@cluster0.cmgf6.mongodb.net/angularproject?retryWrites=true&w=majority`,(err,connection)=>{
        if(err) throw err;
        else{
            const db = connection.db("angularproject");
            db.collection("products").find().toArray((err,array)=>{
                if(err) throw err;
                else{
                    res.send(array);
                }
            })  
        }
    });
});



//create the get request based on id
//id coming from client application (DetailScreen)
app.get("/api/products/:id",(req,res)=>{
    ashokIT.connect(`mongodb+srv://admin:admin@cluster0.cmgf6.mongodb.net/angularproject?retryWrites=true&w=majority`,(err,connection)=>{
        if(err) throw err;
        else{
            let db = connection.db("angularproject");
            db.collection("products").find({"_id":new mongodb.ObjectID(req.params.id)}).toArray((err,array)=>{
                if(err) throw err;
                else{
                    res.send(array[0]);
                }
            });
        }
    });
});







//alot port number to node server  (cloud server, AWS, Heroku, GitHub pages)
let port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started");
});





