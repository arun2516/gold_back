const mongoose = require("mongoose");

exports.connect = ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log("connection suceeded")
    }catch(error){
        console.log(error)
    }
}