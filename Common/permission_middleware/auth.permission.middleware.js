const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config')['jwt_secret'];

    ADMIN_PERMISSION = 2048 ;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
 

    return (req, res, next) => {
     

        let user_permission_level = parseInt(req.jwt.permissionLevel);
     console.log(req.jwt.permissionLevel);
        let userId = req.jwt.userId;
        if (user_permission_level & required_permission_level) {
        
            return next();
        } else {
         
            res.status(403).send({ errorcode: "403", messgage: 'forbidden Request' })
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {

   
    let user_permission_level = parseInt(req.jwt.permissionLevel);


    let userId = req.jwt.userId;
 
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (user_permission_level & ADMIN_PERMISSION) {
            return next();
        } else {
            res.status(403).send({ errorcode: "403", messgage: 'forbidden Request' })
         
        }
    }

};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        return next();
    } else {
        res.status(403).send({ errorcode: "403", messgage: 'forbidden Request' })
    }

};
