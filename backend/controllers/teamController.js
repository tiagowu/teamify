const Member = require("../models/memberModel");
const Team = require("../models/teamModel");

const teamController = {
  createTeam: async (req, res) => {
    try {
      const { name, description } = req.body;
      const user = req.user;

      const team = new Team({ name, description, code: await Team.generateUniqueCode(6) });
      await team.save();

      const member = new Member({ user: user._id, role: "manager", team: team._id });
      await member.save();

      team.members.push(member._id);
      await team.save();

      user.teams.push(team._id);
      await user.save();

      return res.status(201).json({ message: "Team created successfully.", team });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
};

module.exports = teamController;
