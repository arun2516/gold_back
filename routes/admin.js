const express = require("express");
const router = express.Router();
const data = require("../module/admingold")


router.put("/todayprice",data.todayprie);

module.exports = router;