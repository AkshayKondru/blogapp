const mongoose = require("mongoose");

const connect = async () => {
  const mongouri = "mongodb://localhost:27017/Registrationform";

  try {
    await mongoose.connect(mongouri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
};

module.exports = connect;
