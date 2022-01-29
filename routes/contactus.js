const express = require("express");
const router = express.Router();
const data = require("../module/contactus")


router.post("/contactus",data.contactus);
router.get("/getcontactus", data.getcontactus);
router.delete(`/deletecontactus/:id`,data.deletecontactus)

module.exports = router;