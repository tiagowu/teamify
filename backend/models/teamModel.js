const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    pendingRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    code: {
      type: String,
      unique: true,
      required: true,
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

teamSchema.statics.generateUniqueCode = async function (length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  while (true) {
    code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    const existingTeam = await this.findOne({ code });
    if (!existingTeam) {
      break;
    }
  }

  return code;
};

teamSchema.statics.createTeam = async function (name, description) {
  const team = new this({
    name,
    description,
    code: await this.generateUniqueCode(6),
  });
  await team.save();
  return team;
};

teamSchema.methods.addMember = async function (memberId) {
  this.members.push(memberId);
  await this.save();
};

teamSchema.methods.removeMember = async function (memberId) {
  this.members.pull(memberId);
  await this.save();
};

teamSchema.methods.getTeamMembers = async function () {
  await this.populate({
    path: "members",
    populate: { path: "user", select: "firstName lastName" },
  });

  return this.members.map(({ _id, user, role }) => ({
    _id,
    name: `${user.firstName} ${user.lastName}`,
    role,
  }));
};

teamSchema.methods.addRequest = async function (userId) {
  this.pendingRequests.push(userId);
  await this.save();
};

teamSchema.methods.removeRequest = async function (userId) {
  this.pendingRequests.pull(userId);
  await this.save();
};

teamSchema.methods.getPendingRequests = async function () {
  await this.populate("pendingRequests", "firstName lastName");
  return this.pendingRequests;
};

teamSchema.methods.addProject = async function (projectId) {
  this.projects.push(projectId);
  await this.save();
};

teamSchema.methods.removeProject = async function (projectId) {
  this.projects.pull(projectId);
  await this.save();
};

teamSchema.methods.getProjects = async function () {
  await this.populate({
    path: "projects",
    populate: {
      path: "members",
      populate: {
        path: "user",
        select: "firstName lastName",
      },
      select: "user",
    },
    select: "_id name description members deadline isCompleted",
  });

  return this.projects;
};

module.exports = mongoose.model("Team", teamSchema);
