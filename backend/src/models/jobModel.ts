import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  email: String,
  status: { type: String, enum: ["pending", "success", "fail"] },
});

const Job = mongoose.model("Job", JobSchema);

export default Job;
