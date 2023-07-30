const Announcement = require("../models/announcementModel");
const Member = require("../models/memberModel");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

const teamController = {
  getUserTeams: async (req, res) => {
    try {
      const { user } = req;

      const teams = await Team.find({ _id: { $in: user.teams } })
        .populate({
          path: "members",
          match: { user: user._id },
          select: "role",
        })
        .select("name description");

      const teamsData = teams.map((team) => ({
        _id: team._id,
        name: team.name,
        description: team.description,
        role: team.members[0].role,
      }));

      return res.status(200).json({ teams: teamsData });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  getTeamById: async (req, res) => {
    try {
      const { team, user } = req;

      const member = await Member.findOne({ user: user._id, team: team._id });
      if (!member) {
        return res.status(403).json({ error: "Sorry, you are not authorized to view this team." });
      }

      const pendingRequests = member.role !== "Member" ? await team.getPendingRequests() : [];
      const projects = await team
        .getProjects()
        .then((teamProjects) =>
          teamProjects.filter((project) => member.role === "Manager" || project.members.some((projMember) => projMember._id.equals(member._id)))
        );

      const members = await team.getTeamMembers();

      const teamData = {
        code: team.code,
        name: team.name,
        description: team.description,
        role: member.role,
        members,
        pendingRequests,
        projects,
      };

      return res.status(200).json({ team: teamData });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
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
  leaveTeam: async (req, res) => {
    try {
      const { team, user } = req;

      const member = await Member.findOne({ user: user._id, team: team._id });
      if (!member) {
        return res.status(403).json({ error: "You are not a member of the team." });
      }

      if (member.role === "Manager") {
        return res.status(400).json({ message: "You cannot leave the team as the manager." });
      }

      await user.removeTeam(team._id);
      await team.removeMember(member._id);
      await Member.findByIdAndDelete(member._id);
      await Project.updateMany({ members: member._id, team: team._id }, { $pull: { members: member._id } });

      return res.status(200).json({ message: "You have successfully left the team." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  getPendingRequests: async (req, res) => {
    try {
      const { team } = req;

      const pendingRequests = await team.getPendingRequests();
      return res.status(200).json({ pendingRequests });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  acceptPendingRequest: async (req, res) => {
    try {
      const { team } = req;
      const userId = req.params.userId;

      const request = team.pendingRequests.find((request) => request.equals(userId));
      if (!request) {
        return res.status(404).json({ error: "User is not requesting to join the team." });
      }

      const member = await Member.createMember(userId, team._id);
      await team.addMember(member._id);
      await team.removeRequest(userId);
      await User.findByIdAndUpdate(userId, { $push: { teams: team._id } });

      const pendingRequests = await team.getPendingRequests();
      const members = await team.getTeamMembers();

      return res.status(200).json({ message: "User successfully added to the team.", pendingRequests, members });
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

      const pendingRequests = await team.getPendingRequests();
      return res.status(200).json({ pendingRequests });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  updateMember: async (req, res) => {
    try {
      const { member, team, body: updates } = req;

      await Member.findByIdAndUpdate(member._id, updates, { new: true });

      const members = await team.getTeamMembers();

      return res.status(200).json({ message: "Member updated successfully.", members });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  removeMember: async (req, res) => {
    try {
      const { team, member } = req;
      const userId = member.user;

      const user = await User.findById(userId);
      await user.removeTeam(team._id);
      await team.removeMember(member._id);
      await Member.findByIdAndDelete(member._id);
      await Project.updateMany({ members: member._id, team: team._id }, { $pull: { members: member._id } });

      const members = await team.getTeamMembers();

      return res.status(200).json({ message: "Member removed successfully.", members });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  getUserProjects: async (req, res) => {
    try {
      const { user } = req;

      const members = await Member.find({ user: user._id }).populate({
        path: "projects",
        populate: {
          path: "members",
          populate: {
            path: "user",
            select: "firstName lastName",
          },
          select: "user",
        },
        select: "-createdAt -updatedAt -__v",
      });
      const projectsData = members.flatMap((member) => member.projects);

      return res.status(200).json({ projects: projectsData });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  createProject: async (req, res) => {
    try {
      const { team } = req;
      const { name, description, members, deadline } = req.body;

      const project = await Project.createProject(team._id, name, description, members, deadline);
      await team.addProject(project._id);

      await Promise.all(
        members.map(async (memberId) => {
          const member = await Member.findById(memberId);
          await member.addProject(project._id);
        })
      );

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
      const { project, user, team, body: updates } = req;

      const member = await Member.findOne({ user: user._id, team: team._id });
      if (!member) {
        return res.status(403).json({ error: "You are not a member of the team." });
      }

      await project.populate("members");
      const userIsMember = project.members.some((member) => member.user.equals(req.user._id));
      if (member.role !== "Manager" && !userIsMember) {
        return res.status(403).json({ error: "You are not authorized to update the project." });
      }

      const updatedProject = await Project.findByIdAndUpdate(project._id, updates, { new: true });
      const projects = await team.getProjects();

      return res.status(201).json({ message: "Project updated successfully.", project: updatedProject, projects });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  createAnnouncement: async (req, res) => {
    try {
      const { team, user, body: data } = req;

      const member = await Member.findOne({ user: user._id, team: team._id });
      if (!member) {
        return res.status(403).json({ error: "You are not a member of the team." });
      }

      const announcement = await Announcement.createAnnouncement({ ...data, author: member._id, team: team._id });
      await team.addAnnouncement(announcement._id);

      return res.status(201).json({ message: "Announcement created successfully.", announcement });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = teamController;
