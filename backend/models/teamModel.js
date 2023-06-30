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

module.exports = mongoose.model("Team", teamSchema);
