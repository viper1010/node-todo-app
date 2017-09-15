const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59ba9f4e82e4317d6ded322f')   //filter
  // }, {
  //   $set: {
  //     completed: true     //update to be applied
  //   }
  // }, {
  //   returnOriginal: false    //return the NEW object not Original
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59bb16daa877b38a9e3f0fab')
  }, {
    $set: {
      name: 'Kim'
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  })

  //db.close();
} );
