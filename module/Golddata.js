const db = require("../Connection2");

exports.golddata = async(req,res,next)=>{
    try{
        const data = await db.pricedata.find().toArray();
        res.send(data)

    }catch(err){
        console.error("error reading",err);
             res.sendStatus(500);

    }
}