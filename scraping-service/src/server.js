const express = require("express");
const scrapeProducts = require("./controllers/scrape");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
app.use(cors()); 
app.use(express.json());
app.get("/", (req, res) => {
  res.json("Sentiment Analysis API");
});

app.get("/scrape", scrapeProducts);
try {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log(err));
} catch (err) {
  console.log(err);
}

app.listen(5000, () => console.log("listening on port 5000"));