import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    likes: { type: Number, default: 0 },
    videos: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Media", MediaSchema);
