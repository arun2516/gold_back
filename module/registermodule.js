const user = require("../model/user");
const admin = require("../model/admin");
const joi = require("joi");
const brcypt = require("bcryptjs")
const jwt = require("jsonwebtoken");






exports.getuserdata = async(req,res)=>{
    var registeruser = await user.find();
    res.send(registeruser);

}

exports.adminsignup = async(req,res)=>{
    const schema = joi.object({
      
        email:joi.string().required(),
        password:joi.string().min(8).required(),

    })
    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});
    var exituser = await admin.findOne({'email':req.body.email}).exec();
    if(exituser) return res.status(400).send({msg:"email already exists"});
    const salt = await brcypt.genSaltSync(10);
    req.body.password  = await brcypt.hashSync(req.body.password,salt);

    const Admin = new admin({
        email:req.body.email,
        password:req.body.password
    })

    var response = await Admin.save();
    res.send(response);
}


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
    const salt = await brcypt.genSaltSync(10);
    req.body.password  = await brcypt.hashSync(req.body.password,salt);

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


exports.adminsignin = async(req,res)=>{
    const schema = joi.object({
        email:joi.string().required(),
        password:joi.string().min(8).required(),
    })
    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

    const exituser = await admin.findOne({"email":req.body.email}).exec();
    if(!exituser) return res.status(400).send({msg:"email not registered as admin"});

    const isvalid = await brcypt.compareSync(req.body.password,exituser.password);
    if(!isvalid) return res.status(400).send({msg:"password doesnt match"});

     // generate token
     var token  = jwt.sign({exituser},process.env.ADMINSECRETKEY,{expiresIn:"1800s"});
     res.send(token);

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
    const isvalid = await brcypt.compareSync(req.body.password,exituser.password);
    if(!isvalid) return res.status(400).send({msg:"password doesnt match"});

    // generate token
    var token  = jwt.sign({exituser},process.env.SECRETKEY,{expiresIn:"1hr"});
    res.send(token);
}



