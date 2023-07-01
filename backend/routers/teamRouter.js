const router = require("express").Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middlewares/authMiddleware");
const teamMiddleware = require("../middlewares/teamMiddleware");

router.use(authMiddleware.verifyToken);
router.param("teamId", teamMiddleware.verifyTeamId);
router.param("memberId", teamMiddleware.verifyMemberId);

router.post("/teams/:teamId/:userId/accept", teamMiddleware.checkPermission(["manager", "co-manager"]), teamController.acceptPendingRequest);
router.delete("/teams/:teamId", teamMiddleware.checkPermission(["manager"]), teamController.deleteTeam);
router.delete("/teams/members/:memberId", teamMiddleware.checkPermission(["manager", "co-manager"]), teamController.removeMember);

module.exports = router;
