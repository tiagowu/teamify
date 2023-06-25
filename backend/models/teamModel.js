const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
