var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(express.static(__dirname+'/public/dist/public'));

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/basic_mongoose') , { useNewUrlParser: true }

var UserSchema = new mongoose.Schema({
    name: {type: String, required:true},
    description: {type: String, required:true},
    },{timestamps: true})
mongoose.model('ToDo', UserSchema);
var ToDo = mongoose.model('ToDo')

app.get('/allTasks', function(req, res){
    ToDo.find({}, function(err, result){
        if(err){
            console.log("Error in Server .find()")
            res.json({message:"Error in Server .find()", error:err})
        }
        else{
            res.json({message:"Success", data:result})
        }
    })
})

app.get('/OneTask/:id', function(req, res){
    console.log("We are in server"+req.params.id)
    ToDo.find({_id:req.params.id}, function(err, result){
        if(err){
            console.log("Error in Server .find()")
            res.json({message:"Error in Server .find()", error:err})
        }
        else{
            res.json({message:"Success", data:result})
        }
    })
})

app.post('/post', function(req, res){
    console.log(req.body)
    ToDo.create(req.body, function(err, people){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data: people})
        }
    })

})

app.listen(8000, function() {
    console.log("listening on port 8000");
})