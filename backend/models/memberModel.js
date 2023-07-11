const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  role: {
    type: String,
    enum: ["Manager", "Co-Manager", "Member"],
    default: "Member",
  },
});

memberSchema.statics.createMember = async function (userId, teamId, role) {
  const member = new this({ user: userId, team: teamId, role });
  await member.save();
  return member;
};

module.exports = mongoose.model("Member", memberSchema);
