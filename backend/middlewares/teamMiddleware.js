const mongoose = require("mongoose");
const Team = require("../models/teamModel.js");
const Member = require("../models/memberModel.js");
const ObjectId = mongoose.Types.ObjectId;

const teamMiddleware = {
  verifyManager: async (req, res, next) => {
    try {
      const teamId = req.params.teamId;
      const userId = req.user._id;

      if (!ObjectId.isValid(teamId)) {
        return res.status(400).json({ error: "Team not found." });
      }

      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found." });
      }

      const member = await Member.findOne({ user: userId, team: teamId, role: "manager" });
      if (!member) {
        return res.status(403).json({ error: "You are unauthorized to perform this action" });
      }

      req.team = team;
      req.member = member;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
};

module.exports = teamMiddleware;
