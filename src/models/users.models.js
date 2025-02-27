// ?add the structure of the data of user comming from the form 
// list all the orr drfine how all properties will look like 
const mongoose  = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minLength:6
    }
})

const User = mongoose.model('user',userSchema);
module.exports = User