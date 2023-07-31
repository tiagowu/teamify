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

taskSchema.statics.createTask = async function (data) {
  console.log(data);
  const task = new this(data);
  await task.save();
  return task;
};

module.exports = mongoose.model("Task", taskSchema);
