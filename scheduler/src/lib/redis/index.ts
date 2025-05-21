import { config } from "dotenv";
import Redis from "ioredis";
config(); // Load environment variables from .env file

//-----------------------------------------------------------------

export const redisClient = new Redis({
  password: process.env.REDIS_PASS,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 10305,
});

redisClient.on("connect", () => console.log(">> Connected to Redis"));
redisClient.on("disconnect", () => console.log(">> Disconnected from Redis"));
redisClient.on("error", function (error) {
  console.error(error);
});

const connectRedis = async () => {
  await redisClient.connect();
};

const disconnectRedis = async () => {
  redisClient.disconnect();
};

//-----------------------------------------------------------------

/**
 * Caches data in Redis
 * @param key The key to cache the data under
 * @param data The data to cache
 */
export const cacheData = async (key: string, data: any) => {
  await connectRedis();
  await redisClient.set(key, JSON.stringify(data));
  await disconnectRedis();
};

/**
 * Retrieves cached data from Redis
 * @param key The key to retrieve the data from
 * @returns The cached data or null if not found
 */
export const getCachedData = async (key: string) => {
  await connectRedis();
  const data = await redisClient.get(key);
  await disconnectRedis();

  if (data) {
    return JSON.parse(data);
  }
  return null;
};

/**
 * Deletes cached data from Redis
 * @param key The key to delete the cached data from
 */
export const deleteCachedData = async (key: string) => {
  await connectRedis();
  await redisClient.del(key);
  await disconnectRedis();
};
