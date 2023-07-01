const Member = require("../models/memberModel.js");

const teamMiddleware = {
  checkPermission: (requiredRoles) => {
    return async (req, res, next) => {
      try {
        const userId = req.user._id;
        const teamId = req.team._id;

        const member = await Member.findOne({ user: userId, team: teamId, role: { $in: requiredRoles } });
        if (!member) {
          return res.status(403).json({ error: "You are unauthorized to perform this action." });
        }

        next();
      } catch (err) {
        return res.status(500).json({ error: "Internal server error. Please try again later." });
      }
    };
  },
};

module.exports = teamMiddleware;
