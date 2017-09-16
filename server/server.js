const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

// app.use((req, res, next)=>{
//   let now = new Date().toString();
//   console.log(`${now}: ${req.method} ${req.url}`);
//   next();
// });

app.post('/todos', (req, res) => {

  let todos = new Todo({
    text: req.body.text
  });

  todos.save().then((doc)=>{
    res.status(200).send(doc)
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
});

app.get('/todos/:id', (req, res)=> {
  let id = req.params.id;
    if(ObjectId.isValid(id))
    {
      Todo.findById(id).then((todo) => {
        if(todo)
        {
          res.send({todo});
        }
        else {
          res.status(404).send('Unable to find Todo with id = '+id);
        }
      }, (err) => {
        res.status(400).send(err);
      }).catch((e) => console.log(e))
    }
    else{
      res.status(404).send('Invalid Id - wrong format');
    }
});

app.listen(3000, ()=>{
  console.log('Todo Web Server started on port 3000!');
});

module.exports = {app}
