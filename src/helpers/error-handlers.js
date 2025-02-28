const handleInputErrors=(error)=>{
    console.log(error.message);
    let errors ={email:'',password:''}

    // validation errors
    if(error.message.includes("user validation failed")){
        Object.values(error.error).forEach(err=>{
             errors[err.properties.path] = err.properties.message
        })
    }
    
    return errors;

}


