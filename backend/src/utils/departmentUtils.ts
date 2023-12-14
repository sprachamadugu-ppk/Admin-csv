import { generateNumber } from "../helper-functions";
import { Department, IDepartmentDoc } from "../models/departmentModel";

export const findOrCreateDepartment = async (
  departmentName: string,
  departmentNo?: number,
) => {
  const existingDepartments = await Department.find({});
  const departmentMap: Record<string, IDepartmentDoc> = {};

  existingDepartments.forEach((department) => {
    if (
      department.departmentName !== null &&
      department.departmentName !== undefined
    ) {
      departmentMap[department.departmentName] = department;
    }
  });

  if (departmentMap.hasOwnProperty(departmentName)) {
    return departmentMap[departmentName];
  }

  const number = departmentNo || generateNumber();
  const newDepartment = await Department.create({
    departmentName,
    departmentNo: number,
  });

  if (!newDepartment) {
    throw new Error("Failed to create a new department");
  }

  departmentMap[departmentName] = newDepartment;

  return newDepartment;
};
