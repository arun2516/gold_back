const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignschema = new Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    
});

const assign = mongoose.model('Assign',assignschema,'assign');
module.exports = assign;