import { Queue } from "bullmq";
import { redisClient } from "../redis";

export const taskQueue = new Queue("taskQueue", { connection: redisClient });
