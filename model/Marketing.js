const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketingteamschema = new Schema({
    name:{
        type:String,
        minlength:2,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    image:{
       type:String,
      
        
    },
    email:{
        type:String,
        required:true
    }
});

const marketingteam = mongoose.model('Marketingteam',marketingteamschema,'marketingteam');
module.exports = marketingteam;