const express = require('express');
const Router = express.Router();
const VerifyUserMiddleware = require('../Middleware/verifyUser.middeware')
const verifylogin = require('../Controller/LoginController')

const config = require('../Common/config/env.config')


const ADMIN =  config.permissionLevels.ADMIN ;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


const PermissionMiddleware = require('../Common/permission_middleware/auth.permission.middleware');
const ValidationMiddleware = require('../Common/permission_middleware/auth.validation.middleware')

const User_actions = require('../Controller/User_actions_controller')
Router.post('/register' ,[
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
] , require('../Controller/RegisterController').post);



Router.post('/login' , [
    VerifyUserMiddleware.hasAuthValidFields, 
    VerifyUserMiddleware.isPasswordAndUserMatch,
    verifylogin.login
]);
Router.get('/users' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    User_actions.list
])

Router.get('/users/:userId' , [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
User_actions.getbyid
] )

Router.delete('/users/:userId' , [

    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    User_actions.RemovebyId
  
] )

Router.patch('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    User_actions.patchById
]);




Router.post('/generateaddress' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
], require('../Controller/GenerateAddresses').generateaddress);




Router.get('/getbalance/:address' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
], require('../Controller/GenerateAddresses').getbalance);


//get the contract bytecode and abi  only  before deploying
Router.post('/contract' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
] , require('../Controller/Create_Contract_EndPoint').contractExecution);


//deploy contract 

Router.post('/contract/address' ,[
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
], require('../Controller/deployContract').getContractAddress);


//get the bytecode of contract  form the  given contract address  already deployed on ethersacan.io 
Router.get('/contract/:address' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
] , require('../Controller/getContractAbiFromAddress').getabifromaddress);



Router.post('/contract/:address/setData'  , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
] , require('../Controller/callContractMethod').setData);

Router.post('/contract/:address/getData',[
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
], require('../Controller/callContractMethod').getdata);

Router.post('/contract/:address/getMetadata' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
] ,  require('../Controller/callContractMethod').getMetadata);

Router.post('/contract/:address/supply' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
],  require('../Controller/callContractMethod').supply);

Router.post('/contract/:address/transfer' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
], require('../Controller/callContractMethod').transfer);


Router.post('/contract/:address/balanceOf', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
] , require('../Controller/callContractMethod').balanceof);


Router.post('/contract/:address/owner', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
] , require('../Controller/callContractMethod').owner)  


Router.post('/contract/:address/transferownership' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
] , require('../Controller/callContractMethod').transferOwner) 

Router.post('/contract/:address/getevent' , [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
], require('../Controller/callContractMethod').getEvents)

module.exports = Router 