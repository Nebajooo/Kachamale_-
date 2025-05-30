// config/keys.js

module.exports = {
  MongoURI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bustickets", // Default URI if no .env file is found
};
