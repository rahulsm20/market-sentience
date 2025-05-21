const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    conversations: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Conversation",
        },
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
