import mongoose from "mongoose";
const { Schema, model } = mongoose;

const scoreSchema = new Schema({
  type: { type: String, enum: ["quiz", "exam", "homework"], required: true },
  score: { type: Number, required: true, min: 0 },
});

const gradeSchema = new Schema(
  {
    learner_id: { type: Number, required: true },
    class_id: { type: Number, required: true },
    scores: [scoreSchema],
  },
  {
    timestamps: true,
  }
);

export const Grade = model("Grade", gradeSchema);
