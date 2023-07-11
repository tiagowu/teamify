const Member = require("../models/memberModel");
const Team = require("../models/teamModel");

const userController = {
  createTeam: async (req, res) => {
    try {
      const { name, description } = req.body;
      const user = req.user;

      const team = await Team.createTeam(name, description);
      const member = await Member.createMember(user._id, team._id, "Manager");

      team.addMember(member._id);
      user.addTeam(team._id);

      return res.status(201).json({ message: "Team created successfully.", team });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  joinTeamWithCode: async (req, res) => {
    try {
      const team = req.team;
      const userId = req.user._id;

      const isPending = team.pendingRequests.includes(userId);
      if (isPending) {
        return res.status(409).json({ error: "You have already requested to join the team." });
      }

      const member = await Member.findOne({ user: userId, team: team._id });
      if (member) {
        return res.status(400).json({ error: "You are already a member of the team." });
      }

      team.addRequest(userId);

      return res.status(200).json({ message: "Request to join the team sent successfully." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  leaveTeam: async (req, res) => {
    try {
      const userId = req.user._id;
      const team = req.team;

      const member = await Member.findOneAndDelete({ user: userId, team: team._id });
      if (!member) {
        return res.status(400).json({ error: "User is not a member of the team." });
      }

      team.removeMember(member._id);

      return res.status(200).json({ message: "User successfully left the team." });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = userController;
