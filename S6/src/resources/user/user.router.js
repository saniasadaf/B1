const { Router } = require("express");
const { commonResponse} = require("./user.controller")

const router = Router();

router.all("/",commonResponse );

module.exports = router;