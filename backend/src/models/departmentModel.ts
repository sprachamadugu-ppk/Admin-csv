import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  deapartmentName: String,
  departmentNo: Number,
});

const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
