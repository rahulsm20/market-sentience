import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const config = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/marketing",
  RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://localhost",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  PORT: process.env.PORT || 3000,
  AUTH0_AUDIENCE:
    process.env.AUTH0_AUDIENCE || "https://dev-123456.us.auth0.com/api/v2/",
  AUTH0_BASE_URL:
    process.env.AUTH0_BASE_URL || "https://dev-123456.us.auth0.com/",
};
