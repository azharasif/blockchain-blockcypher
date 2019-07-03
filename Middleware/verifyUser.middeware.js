
const UserModel = require('../Model/user')
const bcrypt = require("bcrypt");


exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({ errors: errors.join(',') });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({ errors: 'Missing email and password fields' });
    }
}


exports.isPasswordAndUserMatch = (req, res, next) => {


        UserModel.findOne({email:req.body.email} , function(err , user){


        
    if(err) return  res.status(500).send('Error on the server.');
    if (!user) return    res.status(404).send({ errorcode: "404", messgage: 'invalid user/password' })
  
    let passwordFields = user.password ;
    let salt = passwordFields;
    var hash = bcrypt.compareSync(req.body.password, salt);
    
    if(!hash) return  res.status(404).send({ errorcode: "404", messgage: 'invalid user/password' })

else {
    req.body ={
userId:user._id,
email: user.email,
permissionLevel: user.permissionLevel,
provider: 'email',
name: user.firstName + ' ' + user.lastName,
    }
 

}
return next();



        });
      
  

}

