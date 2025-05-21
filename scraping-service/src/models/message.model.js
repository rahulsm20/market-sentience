const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    data: { type: String, required: true },
    conversationId: { type: mongoose.Types.ObjectId, ref: "Conversation" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message };
