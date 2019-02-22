const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const todoRoutes = express.Router();
let Todo = require('./models/user')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        console.log("todos find" + todos)
        if (err) {
            console.log(err);
        } else {
            res.send(todos);
        }
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    console.log("Description " + req.body )
    todo.save()
    .then(todo => {
        res.status(200).json({'todo': 'todo added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new todo failed');
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});
todoRoutes.route('/calendar/:id').get((req,res)=>{
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        if(err)
            res.status(500).send(err)
        else{
            let d = todo.due_date.substring(0,10)
            res.json(d)
        }
    })
})
todoRoutes.route('/calendar/:id').post((req,res)=>{
    var id = req.params.id
    let date = req.body.date
    Todo.findById(id,function(err, todo){
        if(!err){
            todo.due_date = date
            todo.save().then(todo=>{
                res.json(date.substring(0,10))
            })
        }
        else{
            res.status(400).send(err);
        }
    })
})
todoRoutes.route('/delete/:id').get(function(req,res){

    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Todo successfully deleted",
            id: todo._id
        };
        res.status(200).send(response);
    });
})
todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then(todo => {
                res.json(todo);
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});
app.use('/todos', todoRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});