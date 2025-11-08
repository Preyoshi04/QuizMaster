import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    playedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Links each result to a user
    },
    category: {
      type: String,
      required: true,
      trim: true, // helps keep clean strings
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"], // optional: helps validate difficulty
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;
