var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

app.get("/products", (req, res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("react-db");
        database.collection("tblproducts").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.get("/details/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
         var database = clientObject.db("react-db");
         database.collection("tblproducts").find({id:id}).toArray().then(document=>{
            res.send(document);
            res.end();
         })
    })
});

app.post("/addproducts", (req, res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("react-db");
        var product = {
            "id": parseInt(req.body.id), 
            "title": req.body.title,
            "price": parseFloat(req.body.price),
            "stock": (req.body.stock=="true")?true:false
        };
        database.collection("tblproducts").insertOne(product).then(result=>{
            console.log("Record Inserted");
            res.redirect("/products");
            res.end();
        })
    })
});

app.put("/updateproduct",(req, res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
         var database = clientObject.db("react-db");
         var findQuery = {id:parseInt(req.body.id)};
         var updateQuery = {$set : {title:req.body.title, price:parseFloat(req.body.price), stock:(req.body.stock=="true")?true:false}};

         database.collection("tblproducts").updateOne(findQuery, updateQuery).then(result=>{
            console.log("Record Updated");
            res.redirect("/products");
            res.end();
         })
    })
});

app.delete("/deleteproduct/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("react-db");
        database.collection("tblproducts").deleteOne({id:id}).then(result=>{
            console.log("Record Deleted");
            res.redirect("/products");
            res.end();
        })
    })
});
app.get("/users", (request, response)=>{
    mongoClient.connect(connectionString).then((clientObject)=>{
        var database = clientObject.db("react-db");
        database.collection("tbluser").find({}).toArray().then((documents)=>{
            response.send(documents);
        })
    })
});

app.post("/registeruser", (request, response)=>{
    var user = {
         "UserId": request.body.UserId,
         "UserName": request.body.UserName,
         "Password": request.body.Password, 
         "Email": request.body.Email,
         "Age": parseInt(request.body.Age),
         "Mobile": request.body.Mobile
    }
    mongoClient.connect(connectionString).then(clientObject=>{
         var database = clientObject.db("react-db");
         database.collection("tbluser").insertOne(user).then(result=>{
            console.log("Record Inserted");
            response.redirect("/users");
         })
    })
});
app.get("/products/category/:catname", (req, res)=>{
    var catname = req.params.catname;
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("react-db");
        database.collection("tblproducts").find({category:catname}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.listen(8080);
console.log(`Server Started : http://127.0.0.1:8080`);