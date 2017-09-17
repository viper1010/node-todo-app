const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10,
  accessCodes: {lbe: true, ucs: false, uts: true}
};
let token = jwt.sign(data, 'abc123');
console.log(token);

let decoded = jwt.verify(token, 'abc123');
console.log('Decoded', decoded);

// let message = 'I am a new user';
// let hash = SHA256(message).toString();
//
// console.log(`Message = ${message}`);
// console.log(`Hash = ${hash}`);
//
// var data = {
//   id: 4
// }
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// //Man-in-Middle Attack
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
//
// if(token.hash === resultHash){
//   console.log('Data was not changed');
// }
// else{
//   console.log('Data was changed. Dont trust.');
// }
