const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    name: {
      type: String,
      maxlength: [50, "Project name cannot exceed 50 characters."],
      required: [true, "Please provide project name."],
    },
    description: {
      type: String,
      maxlength: [200, "Project description cannot exceed 200 characters."],
      required: [true, "Please provide project description."],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    deadline: {
      type: Date,
      required: [true, "Please provide project deadline."],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

projectSchema.statics.createProject = async function (team, name, description, members, deadline) {
  const project = new this({
    team,
    name,
    description,
    members,
    deadline,
  });
  await project.save();
  return project;
};

module.exports = mongoose.model("Project", projectSchema);
