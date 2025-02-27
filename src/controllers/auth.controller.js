const User = require("../models/users.models")


const handleErrors=(error)=>{
    console.log(error.message);
    let errors ={email:'',password:''}

    // validation errors
    if(error.message.includes("user validation failed")){
        Object.values(error.error).forEach(err=>{
             errors[err.properties.path] = err.properties.message
        })
    }
    

}

module.exports.signup_get = (req,res)=>{
    res.send("sign up")
}

module.exports.login_get = (req,res)=>{
    res.send("login")
}


module.exports.signup_post = async(req,res)=>{
    // console.log('====================================');
    // console.log(req.body);
    // console.log('====================================');
     const {name , password } =req.body;
    try {
        // create user in the databse
       const user =await User.create({email, password})
       res.status(201).json(user)
    } catch (error) {
        const errors = handleErrors(error);
        console.log(error);
        res.status(400).send("error occured")
        
    }
    res.send("new sign up")
}


module.exports.login_post = async (req,res)=>{
    const {email,password } = req.body;
    
    res.send("user login ")
}