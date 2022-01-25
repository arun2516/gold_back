const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactusschema = new Schema({
    name:{
        type:String,
        minlength:2,
        required:true
    },
    city:{
        type:String,
        minlength:3,
        required:true
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