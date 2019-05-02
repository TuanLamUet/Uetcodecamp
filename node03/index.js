let express = require('express');
let mongoose = require('mongoose');
let app = express();
let todoModel = require('./Todo.js')
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : true}))
const port = process.env.PORT || 3000;
// const host = process.env.HOST;

app.get('/', (req,res) => {
    res.send(`Hello, world!`);
});

app.post('/todos',async (req,res) => {
    let newTodo = {
        title : req.body.title,
        completed: req.body.completed,
        created : Date.now()
    }
    try {
        let result = await todoModel.create(newTodo);
        const newResult = {
            succsess : true,
            data : result
        }
        res.json(newResult);
    } catch (error) {
        res.send(error + '');
    }

});

app.get('/todos/:id', async (req,res)=>{
    try {
        // let todo = await todoModel.findById(req.params.id)
        let todo = await todoModel.findOne({_id: req.params.id});
        res.json(todo)
    } catch (error) {
        res.send(error + '')
    }
});

app.get('/todos',async (req,res) => {
    try {
        let todos = await todoModel.find();
        res.json(todos)
    } catch (error) {
        res.send(error + '')
    }
})

app.post('/todos/:id',async (req,res)=>{
    try {
        let todo = await todoModel.findById(req.params.id);
        todo.title = req.body.title;
        let newTodo = await todo.save();
        const newResult = {
            succsess : true,
            data : newTodo
        }
        res.json(newResult);
    } catch (error) {
        res.send(error + '')
    }
})


app.delete('/todos/:id',async (req,res)=>{
    try {
        let todo = await todoModel.findByIdAndDelete(req.params.id);
        res.json(todo)
    } catch (error) {
        res.send(error + '')
    }
})

app.post('/todos/:id/toggle', async (req,res) =>{
    try {
        let todo = await todoModel.findById(req.params.id); // req.params : la mot doi tuong chua tat ca cac params
        todo.completed = !todo.completed;
        const newTodo = await todo.save(); // Luu lai ban ghi
        const result = {
            succsess : true,
            data : newTodo
        }
    } catch (error) {
        res.send(error + '')
    }
})



app.listen(port,()=>{ 
    console.log("Application listening on port: ", port)
});