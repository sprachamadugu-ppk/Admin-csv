import { findOrCreateDepartment } from "../utils/departmentUtils";
import { findOrCreateSite } from "../utils/siteUtils";
import { EmployeeData } from "../interfaces/employee-inteface";
import { IDepartmentDoc } from "../models/departmentModel";
import Employee from "../models/employeeModel";
import { ISiteDoc } from "../models/siteModel";

export const handleEmployeeCreation = async (fileContents: EmployeeData[]) => {
  const existingEmployees = await Employee.find({});
  const newData: any[] = [];

  for (const employeeData of fileContents) {
    const site = await findOrCreateSite(employeeData.site);
    const department = await findOrCreateDepartment(employeeData.department);

    let employee = existingEmployees.find(
      (e) => e.firstName === employeeData.firstName,
    );

    if (!employee) {
      const newEmployee = {
        firstName: employeeData.firstName,
        middleName: employeeData.middleName,
        lastName: employeeData.lastName,
        site: (site as ISiteDoc)._id,
        department: (department as IDepartmentDoc)._id,
      };

      newData.push(newEmployee);
    }
  }

  if (newData.length > 0) {
    await Employee.create(newData);
  }

  return newData;
};
