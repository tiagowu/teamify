const router = require("express").Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middlewares/authMiddleware");
const teamMiddleware = require("../middlewares/teamMiddleware");

router.use(authMiddleware.verifyToken);
router.param("teamId", teamMiddleware.verifyTeamId);

router.delete("/teams/:teamId", teamMiddleware.checkPermission(["manager"]), teamController.deleteTeam);

module.exports = router;
