const mongoose = require("mongoose");
const Team = require("../models/teamModel.js");
const Member = require("../models/memberModel.js");
const Project = require("../models/projectModel.js");
const Task = require("../models/taskModel.js");

const teamMiddleware = {
  verifyTeamId: async (req, res, next) => {
    try {
      const teamId = req.params.teamId;

      const isValidObjectId = mongoose.Types.ObjectId.isValid(teamId);

      if (!isValidObjectId) {
        return res.status(400).json({ error: "Team not found." });
      }

      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found." });
      }

      req.team = team;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  verifyTeamCode: async (req, res, next) => {
    try {
      const { code } = req.body;

      const codeRegex = /^[A-Z0-9]{6}$/;
      if (!codeRegex.test(code)) {
        return res.status(400).json({ error: "Invalid code format." });
      }

      const team = await Team.findOne({ code });
      if (!team) {
        return res.status(404).json({ error: "Team not found." });
      }

      req.team = team;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  verifyMemberId: async (req, res, next) => {
    try {
      const team = req.team;
      const memberId = req.params.memberId;

      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ error: "Member not found." });
      }

      if (!team.members.includes(member._id)) {
        return res.status(404).json({ error: "Member does not belong to the team." });
      }

      req.member = member;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  verifyProjectId: async (req, res, next) => {
    try {
      const team = req.team;
      const projectId = req.params.projectId;

      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found." });
      }

      if (!team.projects.includes(project._id)) {
        return res.status(404).json({ error: "Project does not belong to the team." });
      }

      req.project = project;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  verifyTaskId: async (req, res, next) => {
    try {
      const team = req.team;
      const taskId = req.params.taskId;

      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found." });
      }

      if (!team.tasks.includes(task._id)) {
        return res.status(404).json({ error: "Task does not belong to the team." });
      }

      req.task = task;
      next();
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  checkPermission: (requiredRoles) => {
    return async (req, res, next) => {
      try {
        const userId = req.user._id;
        const teamId = req.team._id;

        const member = await Member.findOne({ user: userId, team: teamId, role: { $in: requiredRoles } });
        if (!member) {
          return res.status(403).json({ error: "You are unauthorized to perform this action." });
        }

        next();
      } catch (err) {
        return res.status(500).json({ error: "Internal server error. Please try again later." });
      }
    };
  },
};

module.exports = teamMiddleware;
