const express = require("express");
const router = express.Router();
const data = require("../module/Golddata")


router.get("/goldata",data.golddata);

module.exports = router;