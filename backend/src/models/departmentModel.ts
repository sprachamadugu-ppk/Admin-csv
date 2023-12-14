import mongoose, { Document, Model } from "mongoose";

interface IDepartmentDoc extends Document {
  departmentName: string;
  departmentNo: Number;
}

interface IDepartmentModel extends Model<IDepartmentDoc> {}

const DepartmentSchema = new mongoose.Schema({
  departmentName: String,
  departmentNo: Number,
});

const Department: IDepartmentModel = mongoose.model<
  IDepartmentDoc,
  IDepartmentModel
>("Department", DepartmentSchema);

export { Department, IDepartmentDoc, IDepartmentModel };
