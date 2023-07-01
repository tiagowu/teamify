const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name."],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [6, "The password must be at least 6 characters long."],
    },
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.addTeam = async function (teamId) {
  this.teams.push(teamId);
  await this.save();
};

userSchema.methods.removeTeam = async function (teamId) {
  this.teams.pull(teamId);
  await this.save();
};

module.exports = mongoose.model("User", userSchema);
