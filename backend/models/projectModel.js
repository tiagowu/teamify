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
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    deadline: {
      type: Date,
      required: true,
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
