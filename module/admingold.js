const db = require("../Connection2");

exports.todayprie = async(req,res,next)=>{
    
    try{
        const {value} = await db.pricedata.findOneAndUpdate({state:req.body.state},{$set:{today:req.body.today}},{returnDocument:"after"});
        res.send(value)

    }catch(err){
        console.error("error reading",err);
             res.sendStatus(500);

    }
}