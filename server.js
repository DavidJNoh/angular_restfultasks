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

app.post('/addtask', function(req, res){
    console.log("###########" + req.body.title + req.body.description)
    ToDo.create(req.body, function(err, task){
        if(err){
            console.log("Adding Error error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data: task})
        }
    })
})

app.post('/addtask/:id', function(req, res){
    console.log("###########" + req.body)
    ToDo.update({_id: req.params.id}, {$set:req.body}, function(err){
        if(err){
            console.log("Update Error error", err);
            res.json({message: "Error", error: err})
        }
        else {
            console.log('Updated Nicely')
            res.json({message: "Success"})
        }
    })
})


app.delete('/task/:id', function(req,res){
    console.log("in the remove function with id ", req.params.id)
    ToDo.deleteOne({_id: req.params.id}, function(err, task){
        if (err){
            console.log("error removing task")
        }
        else{
            console.log("Removed Task Successfully")
            res.json({task})
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