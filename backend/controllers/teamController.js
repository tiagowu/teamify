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
  acceptPendingRequest: async (req, res) => {
    try {
      const userId = req.params.userId;
      const team = req.team;

      const request = team.pendingRequests.find((request) => request.equals(userId));
      if (!request) {
        return res.status(404).json({ error: "User is not requesting to join the team." });
      }

      const member = await Member.createMember(userId, team._id);
      team.addMember(member._id);
      team.removeRequest(userId);

      await User.findByIdAndUpdate(userId, { $push: { teams: team._id } });

      return res.status(200).json({ message: "User successfully added to the team." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  removeMember: async (req, res) => {
    try {
      const memberId = req.member._id;
      const teamId = member.team._id;
      const userId = member.user._id;

      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found." });
      }

      if (!team.members.includes(memberId)) {
        return res.status(400).json({ error: "Member does not belong to the team." });
      }

      team.removeMember(memberId);

      const user = await User.findById(userId);
      user.removeTeam(teamId);

      await Member.findByIdAndDelete(memberId);

      return res.status(200).json({ message: "Member removed successfully." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  getUserTeams: async (req, res) => {
    try {
      const user = req.user;
      const teams = await Team.find({ _id: { $in: user.teams } });

      const teamData = await Promise.all(
        teams.map(async (team) => {
          const member = await Member.findOne({ user: user._id, team: team._id });
          const role = member ? member.role : null;
          return {
            id: team._id,
            name: team.name,
            description: team.description,
            role: role,
          };
        })
      );

      res.json({ teams: teamData });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
};

module.exports = teamController;
