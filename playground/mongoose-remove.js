const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

const id = '59bc6a6223bab19968b49c1b';
const userId = '59bc73c17fcaa416d47f0514';


// Removes ALL the documents in the collection - Result dont have the docs deleted
// Todo.remove({}).then((result) => {
//   console.log(result);
// })


// Todo.findOneAndRemove({}).then((doc) => {
//   console.log(doc);
// })

Todo.findByIdAndRemove('IdToRemove').then((deletedDoc)=>{
  console.log(deletedDoc);
})
