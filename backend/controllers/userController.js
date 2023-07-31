const Member = require("../models/memberModel");
const Team = require("../models/teamModel");

const userController = {
  createTeam: async (req, res) => {
    try {
      const { name, description } = req.body;
      const user = req.user;

      const team = await Team.createTeam(name, description);
      const member = await Member.createMember(user._id, team._id, "Manager");

      await team.addMember(member._id);
      await user.addTeam(team._id);

      return res.status(201).json({ message: "Team created successfully.", teamId: team._id });
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ errors: validationErrors });
      }
      return res.status(500).json({ error: "Internal server error. Please try again later." });
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

      await team.addRequest(userId);

      return res.status(200).json({ message: "Request to join the team sent successfully." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
};

module.exports = userController;
