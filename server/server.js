const express = require('express');
const bodyParser = require('body-parser');

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


app.listen(3000, ()=>{
  console.log('Todo Web Server started on port 3000!');
});

module.exports = {app}
