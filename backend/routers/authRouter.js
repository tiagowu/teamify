const router = require("express").Router();
const authCtrl = require("../controllers/authController");

router.post("/signup", authCtrl.signup);

module.exports = router;
