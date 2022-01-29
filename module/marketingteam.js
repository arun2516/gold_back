const express = require("express");
const router = express.Router();
const marketingteam = require("../model/Marketing");
const multer = require("multer");
const {v4:uuidv4} = require("uuid")


const DIR = './public/';


const Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,DIR);
    },
    filename:(req,file,cb)=>{
        const filename = file.originalname.toLowerCase().split(" ").join('-');
        cb(null, uuidv4() + '-' + filename)
    },
})



const upload = multer({
    storage:Storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
            cb(null,true);
        }else{
            cb(null,false);
            return cb(new Error('only .png,.jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/addmember",upload.single("image"),async(req,res)=>{
    const url = req.protocol+'://'+req.get('host')
    
    const Marketingteam = new marketingteam({
        name:req.body.name,
        email:req.body.email,
        city:req.body.city,
        image:url + '/public/' + req.file.filename
        
    });
    const response = await Marketingteam.save();
    res.send(response);
})

router.get("/getmembers" , async(req,res)=>{
    const response = await marketingteam.find();
    res.send(response);
})



module.exports = router;