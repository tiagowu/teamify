const Member = require("../models/memberModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

const teamController = {
  deleteTeam: async (req, res) => {
    try {
      const teamId = req.team._id;

      const deletedTeam = await Team.findByIdAndDelete(teamId);
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
