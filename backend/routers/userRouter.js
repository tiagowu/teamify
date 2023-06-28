const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const teamMiddleware = require("../middlewares/teamMiddleware");

router.use(authMiddleware.verifyToken);

router.post("/teams", userController.createTeam);
router.post("/teams/join", teamMiddleware.verifyTeamCode, userController.joinTeamWithCode);

module.exports = router;
