const router = require("express").Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middlewares/authMiddleware");
const teamMiddleware = require("../middlewares/teamMiddleware");

router.use(authMiddleware.verifyToken);
router.param("teamId", teamMiddleware.verifyTeamId);
router.param("memberId", teamMiddleware.verifyMemberId);
router.param("projectId", teamMiddleware.verifyProjectId);
router.param("taskId", teamMiddleware.verifyTaskId);

router.get("/teams", teamController.getUserTeams);
router.get("/teams/:teamId", teamController.getTeamById);
router.delete("/teams/:teamId", teamMiddleware.checkPermission(["Manager"]), teamController.deleteTeam);
router.delete("/teams/:teamId/leave", teamController.leaveTeam);

router.get("/teams/:teamId/pending-requests", teamMiddleware.checkPermission(["Manager", "Co-Manager"]), teamController.getPendingRequests);
router.post("/teams/:teamId/:userId/accept", teamMiddleware.checkPermission(["Manager", "Co-Manager"]), teamController.acceptPendingRequest);
router.post("/teams/:teamId/:userId/decline", teamMiddleware.checkPermission(["Manager", "Co-Manager"]), teamController.declinePendingRequest);
router.put("/teams/:teamId/members/:memberId", teamMiddleware.checkPermission(["Manager"]), teamController.updateMember);
router.delete("/teams/:teamId/members/:memberId", teamMiddleware.checkPermission(["Manager"]), teamController.removeMember);

router.get("/projects", teamController.getUserProjects);
router.post("/teams/:teamId/projects", teamMiddleware.checkPermission(["Manager", "Co-Manager"]), teamController.createProject);
router.put("/teams/:teamId/projects/:projectId", teamController.updateProject);

router.get("/tasks", teamController.getUserTasks);
router.post("/teams/:teamId/tasks", teamMiddleware.checkPermission(["Manager", "Co-Manager"]), teamController.createTask);
router.put("/teams/:teamId/tasks/:taskId", teamController.updateTask);

router.get("/announcements", teamController.getUserAnnouncements);
router.post("/teams/:teamId/announcements", teamMiddleware.checkPermission(["Manager", "Co-Manager"]), teamController.createAnnouncement);

module.exports = router;
