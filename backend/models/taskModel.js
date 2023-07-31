const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    name: {
      type: String,
      maxlength: [50, "Task name cannot exceed 50 characters."],
      required: [true, "Please provide task name."],
    },
    description: {
      type: String,
      maxlength: [200, "Task description cannot exceed 200 characters."],
      required: [true, "Please provide task description."],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
