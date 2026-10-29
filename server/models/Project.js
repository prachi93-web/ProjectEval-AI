import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    studentEmail: { type: String, required: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    githubUrl: { type: String, default: "" },
    score: { type: Number, default: null },
    strengths: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    evaluationStatus: {
      type: String,
      enum: ["pending", "evaluating", "evaluated", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const projectModel =
  mongoose.models.project || mongoose.model("project", projectSchema);

export default projectModel;
