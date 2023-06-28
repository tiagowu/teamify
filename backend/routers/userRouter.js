const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.verifyToken);

router.post("/teams", userController.createTeam);

module.exports = router;
