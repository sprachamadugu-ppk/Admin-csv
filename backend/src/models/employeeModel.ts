import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  empNo: Number,
  firstName: String,
  middleName: String,
  lastName: String,
  site: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
