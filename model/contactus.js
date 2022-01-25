const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactusschema = new Schema({
    firstname:{
        type:String,
        minlength:2,
        required:true
    },
    lastname:{
        type:String,
        minlength:3,
    },
   
    email:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        minlength:10,
        required:true
    },
    message:{
        type:String,
        minlength:5,
        required:true
    },
    
});

const contactus = mongoose.model('Contactus',contactusschema,'contactus');
module.exports = contactus;