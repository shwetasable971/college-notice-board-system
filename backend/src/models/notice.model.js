import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    department: String,
    priority: String,
    publishDate: Date,
    expiryDate: Date,
    postedBy: String,
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);