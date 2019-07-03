const Usermodel = require('../Model/user')
var bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtSecret = require('../Common/config/env.config').jwt_secret 
const refreshtokenSecret = require("../Common/config/env.config").refreshTokenSecret 




exports.login = (req, res)=> {
     
    try {
        
        let refreshId = req.body.userId + jwtSecret;
   
        let token = jwt.sign(req.body, jwtSecret);
   
        let refresh_token =  jwt.sign(req.body  , refreshtokenSecret)

        res.status(201).send({accessToken: token , refresh_tokken:refresh_token});
    } catch (err) {
        
         res.status(500).send({ errorcode: "500", messgage: 'internal server error' })
    }
};



exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, refreshtokenSecret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({ errorcode: "500", messgage: 'internal server error' })
    }
};
