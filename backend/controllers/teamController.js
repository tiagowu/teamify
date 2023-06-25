const Member = require("../models/memberModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

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
  deleteTeam: async (req, res) => {
    try {
      const teamId = req.params.teamId;

      const deletedTeam = await Team.findOneAndDelete({ _id: teamId });
      if (!deletedTeam) {
        return res.status(404).json({ error: "Team not found or already deleted." });
      }

      const memberIds = deletedTeam.members;
      const userIds = await Member.distinct("user", { _id: { $in: memberIds } });

      await Member.deleteMany({ _id: { $in: memberIds } });
      await User.updateMany({ _id: { $in: userIds } }, { $pull: { teams: teamId } });

      return res.status(200).json({ message: "Team and associated members deleted successfully." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
};

module.exports = teamController;
