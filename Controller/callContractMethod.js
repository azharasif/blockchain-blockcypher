var Web3 = require('web3');
const solc = require('solc')
var fs = require('file-system');
const Tx = require('ethereumjs-tx');


exports.setData = (req, res) => {

    
    if( !req.body.abi || req.params.abi  === "")  return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.accountAddress|| req.body.accountAddress === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.initialSupply|| req.body.initialSupply === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else  if(!req.params.address ||req.params.address  === "")  return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.PrivateKey || req.body.PrivateKey === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.assetName || req.body.assetName === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.issuer || req.body.issuer  === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.description ||req.body.description === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.contactName || req.body.contactName === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.contactEmail || req.body.contactEmail  === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.contactAddress || req.body.contactAddress  === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.contactPhone || req.body.contactPhone === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.matterNumber  ||req.body.matterNumber  === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.fileHash || req.body.fileHash === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})
    else if  (!req.body.effectiveDates  || req.body.effectiveDates === "") return res.send({errorcode: "ER0002",message:"You have not provided all the mandatory details."})


    var abi = req.body.abi;
    var account_address = req.body.accountAddress
    var private_key = req.body.PrivateKey
    var contract_address = req.params.address
    var initialSupply = req.body.initialSupply;
    var assetName = req.body.assetName;
    var issuer = req.body.issuer;
    var description = req.body.description;
    var contactName = req.body.contactName;
    var contactEmail = req.body.contactEmail;
    var contactAddress = req.body.contactAddress;
    var contactPhone = req.body.contactPhone;
    var matterNumber = req.body.matterNumber;
    var fileHash = req.body.fileHash;
    var effectiveDates = req.body.effectiveDates;

    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {



  try{
    var account_address = req.body.accountAddress

        var MyContract = new web3.eth.Contract(abi, account_address);


        const contractFunction = MyContract.methods.setData(initialSupply, assetName, issuer, description, contactName, contactEmail, contactAddress, contactPhone, matterNumber, fileHash, effectiveDates)

        const contractfunctionabi = contractFunction.encodeABI();

        contractFunction.estimateGas({ from: account_address }).then((gasAmount) => {
            estimatedGas = gasAmount.toString(16);

            web3.eth.getTransactionCount(account_address).then(_nonce => {
                nonce = _nonce.toString(16);

                const txParams = {

                    gasLimit: web3.utils.toHex(3000000),
                    gasPrice: web3.utils.toHex(2000000000),
                    to: contract_address,
                    data: contractfunctionabi,
                    from: account_address,
                    nonce: '0x' + nonce
                };

                 try{
                const tx = new Tx(txParams);

                let privateKey = Buffer.from(private_key, 'hex');
                tx.sign(privateKey);
                const serializedTx = tx.serialize();

                const raw = '0x' + serializedTx.toString('hex')

                web3.eth.sendSignedTransaction(raw, (err, txHash) => {

                }).on('receipt', function (receipt) {

                    res.status(201).send({ transaction_hash: receipt.transactionHash })

                })

            } catch(error){
               
                res.status(403).send({ errorcode: "ER0002", Error: error.message })

            }
            })
        })
    }catch(error){
       
        res.status(403).send({ errorcode: "ER0002", Error: error.message })
    }
    }
}



exports.getdata = (req, res) => {
    if( !req.body.abi ||req.body.abi  === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if(!req.params.address ||req.params.address  === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})

    var abi = req.body.abi;;

    var contract_address = req.params.address

        
   
    
    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {

        var MyContract = new web3.eth.Contract(abi, contract_address);



        var data = MyContract.methods.getData().call()
            .then((data) => {

                newmetadata1 = data
                data = {
                    "assetName": newmetadata1[0],
                    "issuer": newmetadata1[1],
                    "description": newmetadata1[2],
                    "Contact Name": newmetadata1[3],
                    "Contact Email": newmetadata1[4],
                    "Contact Address": newmetadata1[5],
                    "Contact Phone": newmetadata1[6],

                }
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })


    }

}

exports.getMetadata = (req, res) => {
    if( !req.body.abi ||req.body.abi  === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if(!req.params.address ||req.params.address  === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    var abi = req.body.abi;
    var contract_address = req.params.address

    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {




        var MyContract = new web3.eth.Contract(abi, contract_address);

        var metadata = MyContract.methods.getmetadata().call()
            .then((metadata) => {

                newmetadata = metadata
                metdataa = {
                    "Matter Number": newmetadata[0],
                    "File Hash": newmetadata[1],
                    "Effective Dates": newmetadata[2],
                    "Date Created": newmetadata[3]
                }
                res.send(metdataa)
            });
    }
}





exports.supply = (req, res) => {
    if( !req.body.abi ||req.body.abi  === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if(!req.params.address ||req.params.address  === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    var abi = req.body.abi;
    var contract_address = req.params.address

    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {

        var MyContract = new web3.eth.Contract(abi, contract_address);


        var supply = MyContract.methods.totalSupply().call()
            .then((supply) => {

                res.send({ total_supply: supply })
            })

    }

}

exports.transfer = (req, res) => {

    if( !req.body.abi ||req.body.abi  === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
  else  if(!req.params.address ||req.params.address  === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
   else if(!req.body.PrivateKey || req.body.PrivateKey ===  "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
   else if(req.body.accountAddress ||  req.body.accountAddress === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
   else if(!req.body.address || req.body.address === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
   else if(!req.body.ammount || req.body.ammount === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})



    var to_Address = req.body.address
    var ammount = req.body.ammount
    var account_address = req.body.accountAddress
    var private_key = req.body.PrivateKey
    var contract_address = req.params.address
    var abi = req.body.abi;
    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {


        try {
            var MyContract = new web3.eth.Contract(abi, account_address);

            var transfer = MyContract.methods.transfer(to_Address, ammount)
            var trasnferabi = transfer.encodeABI();


            transfer.estimateGas({ from: account_address }).then((gasAmount) => {
                web3.eth.getTransactionCount(account_address).then(_nonce => {
                    nonce = _nonce.toString(16);

                    const txParams = {

                        gasLimit: web3.utils.toHex(3000000),
                        gasPrice: web3.utils.toHex(2000000000),
                        to: contract_address,
                        data: trasnferabi,
                        from: account_address,
                        nonce: '0x' + nonce
                    };
                    try {
                        const tx = new Tx(txParams);
                        let privateKey = Buffer.from(private_key, 'hex');
                        tx.sign(privateKey);
                        const serializedTx = tx.serialize();
                        const raw = '0x' + serializedTx.toString('hex')
                        web3.eth.sendSignedTransaction(raw, (err, txHash) => {



                        }).on('receipt', function (receipt) {

                            res.status(201).send({ transaction_hash: receipt.transactionHash })

                        })

                    } catch (error) {


                        res.status(403).send({ errorcode: "ER0002", Error: error.message })
                    }




                })

            }).catch((err) => {

                res.status(403).send({ errorcode: "ER0002", error: err.message })

            })

        }
        catch (error) {

            console.log(error)
            res.status(403).send({ errorcode: "ER0002", Error: error.message })
        }
    }
}


exports.balanceof = (req, res) => {


    if(!req.body.address || req.body.address === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if(!req.params.address || req.params.address == "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if(!req.body.abi || req.body.abi === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})


    var balance_of_adress = req.body.address
    var contract_address = req.params.address

    if (Web3.utils.isAddress(balance_of_adress)) {

    }
    else {
        res.send({ message: "provider address " + balance_of_adress + "is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can't be converted" })
    }

    var abi = req.body.abi;
    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {
        var MyContract = new web3.eth.Contract(abi, contract_address);
        var balanceOf = MyContract.methods.balanceOf(balance_of_adress).call()
            .then((balanceOf) => {

                res.status(201).send({ balance: balanceOf })
            })

    }

}



exports.owner = (req, res) => {

    if(!req.body.abi || req.body.abi === "")  return res.send({message:"field should not be epmty"})
    else  if(!req.params.address || req.params.address === "")  return res.send({message:"field should not be epmty"})

    var abi = req.body.abi;
    var contract_address = req.params.address
    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {


        var MyContract = new web3.eth.Contract(abi, contract_address);


        var owner = MyContract.methods.owner_().call()
            .then((owner) => {

                res.status(201).send({ Contract_owner: owner })
            })


    }
}


exports.transferOwner = (req, res) => {

    if(!req.body.abi ||req.body.abi === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if(req.params.address  || req.params.address  ===  "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if( req.body.address  ||  req.body.accountAddress === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if(req.body.accountAddress || req.body.accountAddress === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})
    else  if(req.body.PrivateKey || req.body.PrivateKey === "")  return res.send({errorcode: "ER0002",message:"field should not be epmty"})



    var abi = req.body.abi;
    var contract_address = req.params.address
    var transfer_ownership = req.body.address
    var account_address = req.body.accountAddress
    var private_key = req.body.PrivateKey

   


    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
    if (typeof web3 !== 'undefined') {

        try {

            var MyContract = new web3.eth.Contract(abi, contract_address);


            var transfer = MyContract.methods.transferOwnership(transfer_ownership)
            var trasnferabi = transfer.encodeABI();


            web3.eth.getTransactionCount(account_address).then(_nonce => {
                nonce = _nonce.toString(16);

                const txParams = {

                    gasLimit: web3.utils.toHex(3000000),
                    gasPrice: web3.utils.toHex(20000000),
                    to: contract_address,
                    data: trasnferabi,
                    from: account_address,
                    nonce: '0x' + nonce
                };

            
                const tx = new Tx(txParams);

                let privateKey = Buffer.from(private_key, 'hex');
                tx.sign(privateKey);
                const serializedTx = tx.serialize();

                const raw = '0x' + serializedTx.toString('hex')

                web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                }).on('receipt', function (receipt) {

                    res.status(201).send({ transaction_recipet: receipt })

                }).catch((err) => {
                    res.status(403).send({ errorcode: "ER0002", error: err.message })
                })


            }).catch((err) => {
                res.status(403).send({ errorcode: "ER0002", error: err.message })
            })



        } catch (error) {

            console.log(error)
            res.status(403).send({ errorcode: "ER0002", Error: error.message })
        }
    }


}

exports.getEvents = (req, res) => {

    console.log(
        req.params.address)
    var contract_address = req.params.address;
    var abi = req.body.abi;
    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));

    var MyContract = new web3.eth.Contract(abi, contract_address);

    let events = MyContract.events.allEvents();

    res.send({ events })

    // events.get((error, events) => {
    //     if (error)
    //         console.log('Error getting events: ' + error);
    //     else
    //         return res.json(events);
    // });


}