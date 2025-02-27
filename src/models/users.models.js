// ?add the structure of the data of user comming from the form 
// list all the orr drfine how all properties will look like 
const mongoose  = require('mongoose')
const {isEmail} = require("validator")
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"password is a required field"],
        unique:true,
        minlength:[6,"minimum password length is 6 character"]
    }
})

const User = mongoose.model('user',userSchema);
module.exports = User