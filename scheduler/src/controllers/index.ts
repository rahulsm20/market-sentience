//---------------------------------------------------------------------------------

import { Request, Response } from "express";
import { Conversation } from "../lib/models/conversation.model";
import { rabbitMQ } from "../lib/rabbitmq";

//---------------------------------------------------------------------------------

/**
 * Adds a task to the queue.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the result of the operation.
 */
export const addTaskToQueue = async (req: Request, res: Response) => {
  const { company, category } = req.body;

  if (!company || !category) {
    return res
      .status(400)
      .json({ message: "Company and category are required" });
  }
  const query = `${company}+${category}`;

  const conversation = new Conversation({
    query,
  });

  const saved = await conversation.save();

  const message = {
    conversationId: saved._id,
    company,
    category,
  };
  await rabbitMQ.sendToQueue("taskQueue", JSON.stringify(message));
  return res.status(201).json({ conversationId: saved._id });
};
