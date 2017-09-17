const bcrypt = require('bcryptjs');

let password = 'abc123!';
let hashedPassword = '$2a$10$0bRyel1vyHu.YHr/RRM8j.teCQ6qoFt7cC7vrFNXNo8zBxG5KKbeO';

// bcrypt.genSalt(10, (err, salt)=>{
//   console.log('---- SALT ---- ', salt);
//   bcrypt.hash(password, salt, (err, hash)=>{
//     hashedPassword = hash;
//     console.log(hash);
//   })
// });

bcrypt.compare(password, hashedPassword, (err, res)=>{
  console.log('RESULT ===> ', res);
})
