const assign = require("../model/assigncontact");


exports.postassign = async(req,res)=>{
   const Assign = new assign(
       {
           name:req.body.name,
           city:req.body.city,
           email:req.body.email,
           mobileno:req.body.mobileno,
           message:req.body.message
       }

   )
   var response = await Assign.save();
   res.send(response);
}

exports.getassign = async(req,res)=>{
    const data = await assign.find();
    res.send(data)
}