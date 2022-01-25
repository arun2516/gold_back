const express = require("express");
const router = express.Router();
const reg = require("../module/registermodule");

router.post("/signin", reg.signin);
router.post("/signup",reg.signup);
router.post("/resetpass",reg.reset);
router.post('/newpass',reg.newpass);

module.exports = router;