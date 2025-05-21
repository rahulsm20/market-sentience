/**
 * Routes for managing tasks in the task queue.
 * @module taskRoutes
 */
//-----------------------------------------------------------------------------------

import express from "express";
import { addTaskToQueue } from "../controllers/index";
import { taskQueue } from "../lib/bullmq";

// ----------------------------------------------------------------------------------

const router = express.Router();

router.post("/tasks", addTaskToQueue);

router.get("/tasks", async (_req, res) => {
  try {
    const jobs = await taskQueue.getJobs();
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const job = await taskQueue.getJob(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

export { router as taskRoutes };
