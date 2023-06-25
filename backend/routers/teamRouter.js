const router = require("express").Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middlewares/authMiddleware");
const teamMiddleware = require("../middlewares/teamMiddleware");

router.post("/teams", authMiddleware.verifyToken, teamController.createTeam);
router.delete("/teams/:teamId", authMiddleware.verifyToken, teamMiddleware.verifyManager, teamController.deleteTeam);

module.exports = router;
