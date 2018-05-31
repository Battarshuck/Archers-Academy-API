var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/archers-academy');

//imported models
var Annoucement = require('./model/annoucement');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extneded: false}));

app.get('/annoucement', function(request, response){

  Annoucement.find({},function(err, success){
    if(err){
      response.status(500).send({error:"couldn't find any annoucement"});
    }else{
      response.send(success);
    }
  })
});

app.post('/annoucement/add', function(request, response){
      var annoucement = new Annoucement();
      annoucement.title = request.body.title;
      annoucement.description = request.body.description;
      annoucement.note = request.body.note;
      annoucement.key = annoucement._id;
      
      annoucement.save(function(err, done){
          if(err){
            response.status(500).send({error:"could not note save the annoucement"});
          }else {
            response.status(200).send(done);
          }
      });
});

app.listen(3000, function(){
  console.log("archers academy API is running on port 3000...");
});
