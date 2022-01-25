const user = require("../model/user");
const joi = require("joi");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgmail = require("@sendgrid/mail");


// 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


//
sgmail.setApiKey("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")


const EMAIL = "toarun25@gmail.com"


exports.signup = async(req,res,next)=>{
    // user input validation by joi validation

    const schema = joi.object({
        firstname:joi.string().min(2).max(15).required(),
        lastname:joi.string().min(3).max(15),
        username:joi.string().min(5).max(15).required(),
        email:joi.string().min(6).max(50).email().required(),
        password:joi.string().min(8).max(16).required(),

    })

    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

    //email already exiting or not?//
    var exituser = await user.findOne({'email':req.body.email}).exec();
    if(exituser) return res.status(400).send({msg:"email already exists"});

    //create /register
    const salt = await brcypt.genSalt(10);
    req.body.password  = await brcypt.hash(req.body.password,salt);

    const User = new user({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    var response = await User.save();
    res.send(response);
    
}

exports.signin = async(req,res,next)=>{
    // user input validation - joi validation

    const schema = joi.object({
        email:joi.string().min(6).max(50).email().required(),
        password:joi.string().min(8).max(16).required(),
    })

    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

    // is registered user
    const exituser = await user.findOne({"email":req.body.email}).exec();
    if(!exituser) return res.status(400).send({msg:"email not registered"});

    // password compare check
    const isvalid = await brcypt.compare(req.body.password,exituser.password);
    if(!isvalid) return res.status(400).send({msg:"password doesnt match"});

    // generate token
    var token  = jwt.sign({exituser},process.env.SECRETKEY,{expiresIn:"1hr"});
    res.send(token);
}

exports.reset=async(req,res,next)=>{
   await crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
       user.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"user dont exist with that email"})
            }
            user.resettoken = token
            user.expiretoken = Date.now()+3600000
            user.save().then((result)=>{
                sgmail.send({
                    to:user.email,
                    from:'toarun25@gmail.com',
                    subject:"Password reset",
                    html:`
                    <p>You requested for Password reset</p>
                    <h5>click in this <a href="http://localhost:3000/newpass/${token}">link</a> to reset Password</h5>
                    `
                })
                res.json({message:"check your email and Reset Your Password"})
            })
        })
            
           
           
        
    })
}

exports.newpass = async(req,res,next)=>{
    const newpassword = req.body.password;
    const sendtoken = req.body.token;
    user.findOne({resettoken:sendtoken, expiretoken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"try again session expired"})
        }
        brcypt.hash(newpassword,10).then(hashedpassword=>{
            user.password = hashedpassword
            user.resettoken = undefined
            user.expiretoken = undefined
            user.save().then((saveduser)=>{
                res.json({message:"password updated success"})
            })
        })
    }).catch(err=>{
        console.log(err);
    })
}