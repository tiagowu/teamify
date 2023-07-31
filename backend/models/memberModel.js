const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Manager", "Co-Manager", "Member"],
      default: "Member",
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

memberSchema.statics.createMember = async function (userId, teamId, role) {
  const member = new this({ user: userId, team: teamId, role });
  await member.save();
  return member;
};

memberSchema.methods.addProject = async function (projectId) {
  this.projects.push(projectId);
  await this.save();
};

memberSchema.methods.removeProject = async function (projectId) {
  this.projects.pull(projectId);
  await this.save();
};

memberSchema.methods.addTask = async function (taskId) {
  this.tasks.push(taskId);
  await this.save();
};

memberSchema.methods.removeTask = async function (taskId) {
  this.tasks.pull(taskId);
  await this.save();
};

module.exports = mongoose.model("Member", memberSchema);
