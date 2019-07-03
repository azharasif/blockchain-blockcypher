
var Web3 = require('web3');

const address = require('../Model/adresses')




// generate the private and public keys and store in database
exports.generateaddress = (req , res  , next)=>{

 
    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));

    if (typeof web3 !== 'undefined') {
            
        var store_Address = new address({
           
            Public_key:web3.eth.accounts.create("string").address,

            Private_key:web3.eth.accounts.create("string").privateKey,
    
        })

 
  

 
   store_Address.save().then((result)=>{

    res.status(201).send({keys: result});

})
       // res.status(201).send({doc})


   
    }

 

}

exports.getbalance = (req , res)=>{

   
web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));


    if (typeof web3 !== 'undefined') {

        
        web3.eth.getBalance(req.params.address, function (error, result) {
          
            if (!error){
           
                res.status(201).send({adress:req.params.address , Ether:web3.utils.fromWei(result,'ether') })
            }else  

            
            return res.status(501).send({message:"error "})
        });
          }




}