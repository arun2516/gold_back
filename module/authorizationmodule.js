const jwt = require("jsonwebtoken");

exports.authorizeuser = async(req,res,next)=>{
    // check whether token exist or not
    if(!req.headers['admintoken']) return res.status(401).send({msg:"unauthorised"});

    //verify token
    try{
        req.body.user= await jwt.verify(req.headers['admintoken'],process.env.ADMINSECRETKEY);
        next();
    }catch(err){
        res.send(err);
    }
}