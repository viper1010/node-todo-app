const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  db.collection('Todos').insertOne({
    text: 'Todo Task - 10',
    completed: false
  }, (err, result)=>{
    if(err){
      return console.log('Unable to insert ToDo - ', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // db.collection('Users').insertOne({
  //   name: 'Andy',
  //   age: 25,
  //   location: 'MA'
  // }, (err, result)=>{
  //   if(err){
  //     return console.log('Unable to add Users - ', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
} );
