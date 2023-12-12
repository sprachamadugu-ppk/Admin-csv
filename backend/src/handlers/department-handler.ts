import { DepartmentData } from "../interfaces/department-inteface";
import Department from "../models/departmentModel";

export const handleDepartmentCreation = async (
  fileContents: DepartmentData[],
) => {
  for (const departmentData of fileContents) {
    await Department.create({
      deapartmentName: departmentData.departmentName,
      departmentNo: departmentData.departmentNo,
    });
  }
};
