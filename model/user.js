const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
    firstname:{
        type:String,
        minlength:2,
        required:true
    },
    lastname:{
        type:String,
        minlength:3,
    },
    username:{
        type:String,
        minlength:5,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    resettoken:String,
    expiretoken:Date,
});

const user = mongoose.model('User',userschema,'user');
module.exports = user;