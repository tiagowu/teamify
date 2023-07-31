const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    title: {
      type: String,
      maxlength: [50, "Announcement title cannot exceed 50 characters."],
      required: [true, "Please provide announcement title."],
    },
    content: {
      type: String,
      required: [true, "Please provide announcement content."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  { timestamps: true }
);

announcementSchema.statics.createAnnouncement = async function (data) {
  const announcement = new this(data);
  await announcement.save();
  return announcement;
};

module.exports = mongoose.model("Announcement", announcementSchema);
