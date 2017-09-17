const {User} = require('./../models/user')

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user)=>{
    if(!user){
      res.status(404).send('User not found.');
    }
    req.user = user;
    req.token = token;
    next();
  }).catch(()=>{
    res.status(401).send();  //authentication required
  });
}

module.exports = {authenticate};
