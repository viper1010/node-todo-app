const env = process.env.NODE_ENV || 'development';

console.log('env********', env);

if(env === 'development')
{
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
else if(env === 'test')
{
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';

}

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/user');

let app = express();

let port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(ObjectId.isValid(id))
  {
    Todo.findByIdAndRemove(id).then((todo) => {
      if(todo)
      {
        res.send({todo});
      }
      else {
        res.status(404).send('Unable to find Todo with id = ' + id);
      }
    }, (err) => {
      res.status(404).send(err);
    }).catch((e) => console.log(e))
  }
  else{
    res.status(404).send('Invalid Id - wrong format');
  }
})

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if(ObjectId.isValid(id))
  {
    if(_.isBoolean(body.completed) && body.completed)
    {
      body.completedAt = new Date().getTime();
    }
    else{
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if(todo){
        res.send({todo});
      }
      else {
        res.status(404).send('Unable to find Todo with id = ' + id);
      }
    }, (err) => {
      res.status(404).send(err);
    }).catch((e)=> console.log(e))
  }
  else{
    res.status(404).send('Invalid Id - wrong format');
  }
});

app.listen(port, ()=>{
  console.log('Todo Web Server started on port ', port);
});

module.exports = {app}
