const dotenv = require("dotenv");
dotenv.config();

const config = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/scraping",
  RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://localhost",
  PORT: process.env.PORT || 5000,
};

module.exports = { config };
