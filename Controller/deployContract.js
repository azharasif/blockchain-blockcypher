var Web3 = require('web3');
const solc = require('solc')
var fs = require('file-system');
const Tx = require('ethereumjs-tx');

//deploy contact on rinkeybay 
 exports.getContractAddress =   (req, res) => {

    if(!req.body.contractname ||req.body.contractname === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    
    else if  (!req.body.FileData ||req.body.FileData === "") return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else if  (!req.body.accountAddress || req.body.accountAddress === "") return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else if  (!req.body.PrivateKey ||req.body.PrivateKey === "") return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    

var contract_Name = req.body.contractname
var fildata = req.body.FileData;
var account_Address = req.body.accountAddress ;

if(Web3.utils.isAddress(account_Address)){

}
else{
  

    res.status(403).send({ errorcode: "ER0004", message:"provider address " +account_Address+ " is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can't be converted"})

}


    var private_key = req.body.PrivateKey ;

    

var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));


    if (typeof web3 !== 'undefined') {

    
        let privateKey1 = Buffer.from(private_key, 'hex')

     
        web3.eth.getTransactionCount(account_Address, (err, txCount) => {
        
          try{

             var compiledCode = solc.compile(fildata); 
            var byteCode = compiledCode.contracts[contract_Name].bytecode;
            const txObject =  web3.eth.estimateGas({
                nonce: web3.utils.toHex(txCount),
                data: '0x' + byteCode
            }).then((gasdata)=>{
                 const txObject  ={
                nonce: web3.utils.toHex(txCount),
                gasLimit: gasdata+100000,
                gasPrice: gasdata ,
                data:'0x' + byteCode
                 }
             
                 const tx = new Tx(txObject)
                 tx.sign(privateKey1);
              

                 const serializedTx = tx.serialize()
                 const raw = '0x' + serializedTx.toString('hex')
                
                 web3.eth.sendSignedTransaction(raw).on('receipt' , function (receipt) {
                  
                         res.status(201).send(receipt)
                       
                    })

             
            }).catch((err)=>{
               
                res.status(403).send({ errorcode: "ER0002", error:err.message})
        
            })
        }catch(error){
            res.status(403).send({ errorcode: "ER0004", error:compiledCode.errors})
        
        }

        })
    }
    

   
}

