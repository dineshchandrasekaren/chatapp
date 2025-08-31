import { Schema, model, Types } from "../config/db.config.js";

const SessionSchema = new Schema(
  {
    createdAt: { type: Date, default: Date.now(), expires: "7 hrs" },
    token: { type: String, required: true },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    socketId: {
      type: String,
    },
    isOnline: { type: Boolean, default: false },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);
const SessionModel = model("Session", SessionSchema);

export default SessionModel;
