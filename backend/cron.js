const cron = require("cron");
const https = require("https");

const backendUrl = "https://api.teamify.tiagowu.com";

// Create a new cron job that runs every 14 minutes
const job = new cron.CronJob("*/14 * * * *", function () {
  console.log("Restarting server");

  // Perform an HTTPS GET request to hit the backend API
  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Server restarted successfully");
      } else {
        console.error(`Failed to restart server with status code: ${res.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.error("Error during restart:", err.message);
    });
});

module.exports = job;
