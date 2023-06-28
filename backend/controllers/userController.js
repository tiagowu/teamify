const Member = require("../models/memberModel");
const Team = require("../models/teamModel");

const userController = {
  createTeam: async (req, res) => {
    try {
      const { name, description } = req.body;
      const user = req.user;

      const team = await Team.createTeam(name, description);
      const member = await Member.createMember(user._id, team._id, "manager");

      team.addMember(member._id);
      user.addTeam(team._id);

      return res.status(201).json({ message: "Team created successfully.", team });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = userController;
