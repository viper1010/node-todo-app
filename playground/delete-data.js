const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // deleteMany - deletes ALL occurences
  // db.collection('Todos').deleteMany({text : 'Todo Task - 10'}).then((result)=>{
  //   console.log(result);
  // });

  // deleteOne - deletes the first occurence
  // db.collection('Todos').deleteOne({text: 'Todo Task - 10'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete - Returns first occurence and deletes it from DB
  // db.collection('Todos').findOneAndDelete({completed: false}).then((doc) => {
  //   console.log(doc);
  // });

  // db.collection('Users').deleteMany({name: 'Andy'}).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('59bb16dfab4c3c8a9f34b7ed')}).then((doc)=>{
    console.log(doc);
  });

  //db.close();
} );
