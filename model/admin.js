const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
  
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    }
});

const admin = mongoose.model('Admin',userschema,'admin');
module.exports = admin;