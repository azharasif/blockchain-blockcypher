const Usermodel = require('../Model/user');


exports.list = (req, res) => {

    Usermodel.find().then((user) => {
        res.status(201).send({user });

    }).catch((err)=>{

        res.status(401).send({message:err});
    })

}


exports.getbyid = (req, res) => {

    Usermodel.findById(req.params.userId).then((result) => {
     
       res.status(501).send(result)

    })

}

exports.RemovebyId = (req, res) => {

    Usermodel.findByIdAndRemove(req.params.userId).then((result) => {
        res.status(200).send({message:"deleted sucessfully"})
    })
}

exports.patchById = (req, res)=>{ 

Usermodel.findByIdAndUpdate(req.params.userId , {firstName:req.body.firstName , lastName:req.body.lastName}).exec(function(err , data){

    if(data){
        res.status(201).json({data:"record updated sucessfully !"})
    }
    else {
    
        res.status(501).json({message:"error in updating record"})
        

            }
})



}





// exports.patchById = (req, res) => {

//      console.log(req.body.firstName);
//     UserModel.patchUser(req.params.userId, req.body)
//         .then((result) => {
//             res.status(204).send({});
//         });

// };

// exports.patchUser = (id, userData) => {
//     console.log(id)
//     return new Promise((resolve, reject) => {
//         UserModel.findById(id, function (err, user) {
            
//             if (err) reject(err);
//             for (let i in userData) {
//                 user[i] = userData[i];
//             }
//             user.save(function (err, updatedUser) {
//                 if (err) return reject(err);
//                 resolve(updatedUser);
//             });
//         });
//     })

// };