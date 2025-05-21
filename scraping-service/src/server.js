/**
 * Scraping Service
 * This service scrapes product data from a given URL and stores it in a MongoDB database.
 * It also connects to a RabbitMQ server for message queuing.
 */

//-------------------------------------------------------------

const express = require("express");
const scrapeProducts = require("./controllers/scrape");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { rabbitMQ } = require("./lib/rabbitmq");
require("dotenv").config();

//-------------------------------------------------------------

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.json("Sentiment Analysis API");
});

app.get("/scrape", scrapeProducts);
try {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(">> Connected to MongoDB"))
    .catch((err) => console.log(err));
  rabbitMQ.connect();
} catch (err) {
  console.log(err);
}

app.listen(5000, () =>
  console.log(">> Scraping service is running on port 5000")
);
