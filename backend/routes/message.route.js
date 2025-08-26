import { Schema, model, Types } from "../config/db.config";

const messageSchema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
