import { findOrCreateDepartment } from "../utils/departmentUtils";
import { DepartmentData } from "../interfaces/department-inteface";

export const handleDepartmentCreation = async (
  fileContents: DepartmentData[],
) => {
  for (const departmentData of fileContents) {
    await findOrCreateDepartment(
      departmentData.departmentName,
      departmentData.departmentNo,
    );
  }
};
