const mongoose = require('mongoose');
const bcrypt = require ('bcrypt')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
});









const User = mongoose.model('Users', userSchema);
module.exports = User;



