const express = require("express");
const router = express.Router();
const assigndata = require("../module/assign")


router.post("/postassign",assigndata.postassign);
router.get("/getassign", assigndata.getassign);

module.exports = router;