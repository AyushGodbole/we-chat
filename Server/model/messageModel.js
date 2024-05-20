import mongoose from "mongoose";
const { Schema, model } = mongoose;

// defining schema
const messageSchema = new Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: {
      type: Array,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Messages = model("Messages", messageSchema);

export default Messages;
