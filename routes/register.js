const express = require("express");
const router = express.Router();
const reg = require("../module/registermodule");

router.post("/signin", reg.signin);
router.post("/signup",reg.signup);
router.post('/adminsignup',reg.adminsignup);
router.post("/adminsignin",reg.adminsignin);
router.get("/getuserdata",reg.getuserdata);

module.exports = router;