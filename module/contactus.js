const contactus = require("../model/contactus");
const joi = require("joi");

exports.contactus = async(req,res,next)=>{
    // user input validation by joi validation

    const schema = joi.object({
        name:joi.string().min(2).required(),
        city:joi.string().min(3).required(),
        mobileno:joi.number().min(10).required(),
        email:joi.string().min(6).max(50).email().required(),
        message:joi.string().min(5).max(150).required(),

    })

    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

   

    const Contactus = new contactus({
        name:req.body.name,
        city:req.body.city,
        mobileno:req.body.mobileno,
        email:req.body.email,
        message:req.body.message
    })

    var response = await Contactus.save();
    res.send(response);
    
}

exports.getcontactus = async(req,res,next)=>{
    const data = await contactus.find();
    res.send(data);
}

exports.deletecontactus = async(req,res)=>{
    const id = req.params.id;
    const response = await contactus.findByIdAndDelete(id);
    res.send(response);
}