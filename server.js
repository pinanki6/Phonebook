var express = require("express");
var app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const DIR = 'src/uploads';

//app.use(express.static(__dirname));

var picname;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) =>
	{
		picname=Date.now() + file.originalname;
		cb(null, picname);
    }
});
let upload = multer({storage: storage});


//for cors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var mongoose = require("mongoose");

var AddSchema = new mongoose.Schema( {fnm:String,lnm:String,phn:Number,emid: {type:String,unique:true}}, { versionKey: false } );
var add = mongoose.model("add", AddSchema,"add");


var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());


//to create
app.get("/api/create", function(req, res) {
  mongoose.connect("mongodb://localhost/phonebook");

  add.find(function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
      mongoose.connection.close();
    }
  });
});

//to add contacts
app.post("/api/add", function(req, res) {
  mongoose.connect("mongodb://localhost/phonebook");


  var newadd = new add( {fnm:req.body.fn,lnm:req.body.ln,phn:req.body.pn,emid: req.body.em} );

  newadd.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send("Error while Adding Contact, try again");
    }
    else
    {
      res.send("Successfully Saved");
    }
    mongoose.connection.close();
  });
});

//to show contacts
app.get("/api/memlist", function(req, res) {
  mongoose.connect("mongodb://localhost/phonebook");
  console.log(req.query);

  add.find(function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
      mongoose.connection.close();
    }
  });
});

//to delete contacts
app.delete("/api/deluser", function(req, res) {
  mongoose.connect("mongodb://localhost/phonebook");
  console.log(req.query);

  add.remove({ _id: req.query.id }, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send("Successfully Deleted");
      mongoose.connection.close();
    }
  });
});


//to update contacts
app.put("/api/edit", function(req, res) {
  mongoose.connect("mongodb://localhost/phonebook");
  add.update({ fnm: req.body.fnm,lnm: req.body.lnm, phn: req.body.phn, emid: req.body.emid }, { $set: { fnm: req.body.newfnm, lnm: req.body.newlnm, phn: req.body.newphn, emid: req.body.newemid}},function(err,data) {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      res.send(data);
    }
    mongoose.connection.close();
  });
});































app.listen(3000, function () {
  console.log('Node.js server is running on port 3000');
});
