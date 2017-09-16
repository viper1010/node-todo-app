const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

const id = '59bc6a6223bab19968b49c1b';
const userId = '59bc73c17fcaa416d47f0514';

// Todo.find({}).then((todos) => {
//   console.log('All todos: ', todos);
//   console.log('-------------------------------');
// })
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('-------------------------------');
//   console.log('List of todos by Id: ', todos);
// })
//
// Todo.findOne({
//   completed: false
// }).then((todo)=>{
//   if(todo){
//     console.log('-------------------------------');
//     console.log('FIND ONE RESULT -- ', todo)
//   }
//   else {
//     console.log('No match found.');
//   }
// })
if(ObjectId.isValid(id))
{
  Todo.findById(id).then((todo) => {
    if(todo)
    {
      console.log('-------------------------------');
      console.log('FIND BY ID -- ', todo)
    }
    else {
      console.log('No match found.');
    }
  }).catch((e)=> console.log(e))
}
else{
  console.log('Invalid Id provided - wrong format.')
}


if(ObjectId.isValid(userId))
{
  User.findById(userId).then((user)=>{
    if(user)
    {
      console.log('The User record -- ', user);
    }
    else {
      console.log('User Not Found.');
    }
  }).catch((e) => console.log(e))
}
else{
  console.log('Invalid Id provided - wrong format.')
}
