const router = require("express").Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/teams", authMiddleware.verifyToken, teamController.createTeam);

module.exports = router;
