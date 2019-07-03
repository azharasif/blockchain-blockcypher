const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const AddressSchema = new Schema({
   Public_key:{
       type:String
   },
   Private_key:{
       type:String
   }
});

const userAddress = mongoose.model('Address' , AddressSchema)
module.exports = userAddress;

