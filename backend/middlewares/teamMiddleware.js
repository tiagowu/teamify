const Team = require("../models/teamModel.js");
const Member = require("../models/memberModel.js");

const teamMiddleware = {
  verifyTeamId: async (req, res, next) => {
    try {
      const teamId = req.params.teamId;

      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found." });
      }

      req.team = team;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  checkPermission: (requiredRoles) => {
    return async (req, res, next) => {
      try {
        const userId = req.user._id;
        const teamId = req.team._id;

        const member = await Member.findOne({ user: userId, team: teamId, role: { $in: requiredRoles } });
        if (!member) {
          return res.status(403).json({ error: "You are unauthorized to perform this action." });
        }

        next();
      } catch (err) {
        return res.status(500).json({ error: "Internal server error. Please try again later." });
      }
    };
  },
};

module.exports = teamMiddleware;
