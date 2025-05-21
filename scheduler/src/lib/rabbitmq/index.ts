import { connect } from "amqplib";
import { config } from "../../utils/config";

/**
 * RabbitMQClient class
 * Handles connection to RabbitMQ and sending messages to a queue
 */
class RabbitMQClient {
  private connection: any;
  private channel: any;

  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await connect(config.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue("taskQueue", { durable: true });
      console.log(">> Connected to RabbitMQ");
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
    }
  }
  async sendToQueue(queue: string, message: string) {
    try {
      this.channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
      });
      console.log("Message sent to queue:", message);
    } catch (error) {
      console.error("Error sending message to queue:", error);
    }
  }
}

export const rabbitMQ = new RabbitMQClient();
