const Member = require("../models/memberModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

const teamController = {
  deleteTeam: async (req, res) => {
    try {
      const { team } = req;

      const deletedTeam = await Team.findByIdAndDelete(team._id);
      if (!deletedTeam) {
        return res.status(404).json({ error: "Team not found or already deleted." });
      }

      const memberIds = deletedTeam.members;
      const userIds = await Member.distinct("user", { _id: { $in: memberIds } });

      await Promise.all([
        User.updateMany({ _id: { $in: userIds } }, { $pull: { teams: team._id } }),
        Member.deleteMany({ _id: { $in: memberIds } }),
        Project.deleteMany({ team: team._id }),
      ]);

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
      await team.addMember(member._id);
      await team.removeRequest(userId);

      await User.findByIdAndUpdate(userId, { $push: { teams: team._id } });
      const pendingRequests = await User.find({ _id: { $in: team.pendingRequests } }, "firstName lastName");

      await team.populate({
        path: "members",
        populate: { path: "user", select: "firstName lastName" },
      });

      const members = team.members.map((member) => ({
        _id: member._id,
        name: `${member.user.firstName} ${member.user.lastName}`,
        role: member.role,
      }));

      return res.status(200).json({ message: "User successfully added to the team.", pendingRequests, members });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  removeMember: async (req, res) => {
    try {
      const team = req.team;
      const memberId = req.member._id;
      const teamId = team._id;
      const userId = req.member.user;

      if (!team.members.includes(memberId)) {
        return res.status(400).json({ error: "Member does not belong to the team." });
      }

      const projects = await Project.find({ members: memberId, team: teamId });
      for (const project of projects) {
        await Project.findByIdAndUpdate(project._id, { $pull: { members: memberId } });
      }

      const user = await User.findById(userId);

      await Member.findByIdAndDelete(memberId);
      await team.removeMember(memberId);
      await user.removeTeam(teamId);

      await team.populate({
        path: "members",
        populate: { path: "user", select: "firstName lastName" },
      });

      const members = team.members.map((member) => ({
        _id: member._id,
        name: `${member.user.firstName} ${member.user.lastName}`,
        role: member.role,
      }));

      return res.status(200).json({ message: "Member removed successfully.", members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
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
            _id: team._id,
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
  getTeamById: async (req, res) => {
    try {
      const userId = req.user._id;
      const team = req.team;

      const member = await Member.findOne({ user: userId, team: team._id });
      if (!member) {
        return res.status(403).json({ error: "You are not a member of the team." });
      }

      await team.populate("projects");
      await team.populate({
        path: "projects",
        populate: { path: "members", populate: { path: "user", select: "firstName lastName" } },
      });
      await team.populate("tasks");
      await team.populate({
        path: "members",
        populate: { path: "user", select: "firstName lastName" },
      });

      const pendingRequests = await User.find({ _id: { $in: team.pendingRequests } }, "firstName lastName");
      const projects = team.projects.filter((project) => project.members.some((projMember) => projMember._id.equals(member._id)));
      const members = team.members.map((member) => ({
        _id: member._id,
        name: `${member.user.firstName} ${member.user.lastName}`,
        role: member.role,
      }));

      const teamData = {
        code: team.code,
        name: team.name,
        description: team.description,
        projects: member.role === "Manager" ? team.projects : projects,
        role: member.role,
        members,
        ...(member.role !== "Member" && { pendingRequests }),
      };

      return res.status(200).json({
        team: teamData,
      });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  createProject: async (req, res) => {
    try {
      const { name, description, members, deadline } = req.body;
      const team = req.team;

      const project = await Project.createProject(team._id, name, description, members, deadline);
      team.addProject(project._id);

      for (const memberId of members) {
        const member = await Member.findById(memberId);
        if (member) {
          member.addProject(project._id);
        }
      }

      return res.status(201).json({ message: "Project created successfully.", project });
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ errors: validationErrors });
      }
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  updateProject: async (req, res) => {
    try {
      const userId = req.user._id;
      const { teamId, projectId } = req.params;
      const { isCompleted } = req.body;

      const member = await Member.findOne({ user: userId, team: teamId });
      if (!member) {
        return res.status(403).json({ error: "You are not a member of the team." });
      }

      const project = await Project.findOne({ _id: projectId, team: teamId }).populate("members");
      if (!project) {
        return res.status(404).json({ error: "Project not found." });
      }

      const userIsManager = member.role === "Manager";
      const userIsMember = project.members.some((member) => member.user.equals(req.user._id));
      if (!userIsManager && !userIsMember) {
        return res.status(403).json({ error: "You are not authorized to update the project." });
      }

      project.isCompleted = isCompleted;

      await project.save();

      return res.status(201).json({ message: "Project updated successfully.", project });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  leaveTeam: async (req, res) => {
    try {
      const user = req.user;
      const team = req.team;

      const member = await Member.findOne({ user: user._id, team: team._id });
      if (!member) {
        return res.status(403).json({ error: "You are not a member of the team." });
      }

      if (member.role === "Manager") {
        return res.status(400).json({ message: "You cannot leave the team as the manager." });
      }

      await user.removeTeam(teamId);
      await team.removeMember(member._id);

      const projects = await Project.find({ members: member._id, team: team._id });
      for (const project of projects) {
        await Project.findByIdAndUpdate(project._id, { $pull: { members: member._id } });
      }

      await member.deleteOne();
      return res.status(200).json({ message: "You have successfully left the team." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  updateMember: async (req, res) => {
    try {
      const member = req.member;
      const team = req.team;
      const updates = req.body;

      Object.assign(member, updates);
      await member.save();

      await team.populate({
        path: "members",
        populate: { path: "user", select: "firstName lastName" },
      });

      const members = team.members.map((member) => ({
        _id: member._id,
        name: `${member.user.firstName} ${member.user.lastName}`,
        role: member.role,
      }));

      return res.status(200).json({ message: "Member updated successfully.", members });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  getPendingRequests: async (req, res) => {
    try {
      const team = req.team;

      const pendingRequests = await User.find({ _id: { $in: team.pendingRequests } }, "firstName lastName");
      return res.status(200).json({ pendingRequests });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  declinePendingRequest: async (req, res) => {
    try {
      const { team } = req;
      const userId = req.params.userId;

      const request = team.pendingRequests.find((request) => request.equals(userId));
      if (!request) {
        return res.status(404).json({ error: "User is not requesting to join the team." });
      }

      await team.removeRequest(userId);

      const pendingRequests = team.getPendingRequests();
      return res.status(200).json({ pendingRequests });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
};

module.exports = teamController;
