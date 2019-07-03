var Web3 = require('web3');
const solc = require('solc')
var fs = require('file-system');

//get the contract bytecode and abi  only before  pushing 
exports.contractExecution =   (req , res)=>{
 
  if(!req.body.contractname || req.body.contractname === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    
  else if  (!req.body.contractname || req.body.contractname === "") return res.send({errorcode: "ER0002",message:"field should not be epmty"})
  

try{

  var fildata = req.body.FileData; 
  var Compiledata =  solc.compile(fildata) 
   var contract_Name =  req.body.contractname;
  var byteCode = Compiledata.contracts[contract_Name].bytecode;
  var abiDefinition = JSON.parse(Compiledata.contracts[contract_Name].interface);
}
catch(error){


res.status(403).send({ errorcode: "ER0004", error:Compiledata.errors})

}
finally{

  res.status(201).send({ByteCode : byteCode , abi:abiDefinition});
}


}
