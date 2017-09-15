const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // db.collection('Todos').find({_id: new ObjectID('59ba9f4e82e4317d6ded322f')}).toArray().then((docs)=>{
  //   console.log('Todos: ');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=>{
  //   console.log(err);
  // })

  db.collection('Users').find({name:  'Andy'}).toArray().then((docs)=>{
    console.log('Users: ');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err)=>{
    console.log(err);
  })
  //db.close();
} );
