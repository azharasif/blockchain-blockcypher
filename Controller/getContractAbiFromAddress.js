

var Web3 = require('web3');

//get the bytecode of contract  form the  given contract address  already deployed on ethersacan.io 
exports.getabifromaddress = (req, res) => {
         
    if(!req.params.address || req.params.address === '')  return res.send({errorcode: "ER0002",message:"field should not be epmty"})


    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {
        web3.eth.getCode(req.params.address, (err, byteCode) => {
            if (err) console.log(err)
            res.status(201).send({ bytecode: byteCode })
            // var contractAbi = "";
            // contractAbi = byteCode
            // if (contractAbi !== '') {
            //     console.log(JSON.stringify(contractAbi))
            //     var contract_abi =  JSON.stringify(contractAbi)
            //      //var contract_abi =  JSON.parse(JSON.stringify(contractAbi))
            //     var abi = new web3.eth.Contract(contract_abi);
            //      console.log("result of abi " + abi)
            //     // res.status(201).send({ abi: abi })
            // }
        })
    }
} 
