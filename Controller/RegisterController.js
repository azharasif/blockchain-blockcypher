const Usermodel = require('../Model/user')
const bcrypt = require('bcrypt');



exports.post = (req , res)=>{


    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    req.body.permissionLevel = 1;
    req.body.password = hashedPassword
  

    var user = new Usermodel({
        firstName :req.body.firstName,
        lastName :req.body.lastName,
        email:req.body.email,
        password:hashedPassword,
        permissionLevel:req.body.permissionLevel

    })


user.save().then((result)=>{

    res.status(201).send({id: result._id});

})
   


}