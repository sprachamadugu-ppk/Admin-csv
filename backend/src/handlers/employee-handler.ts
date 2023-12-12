import Site from "../models/siteModel";
import Department from "../models/departmentModel";
import Employee from "../models/employeeModel";
import {
  generateSiteNumber,
  generateDepartmentNumber,
} from "../helper-functions";
import { EmployeeData } from "../interfaces/employee-inteface";

export const handleEmployeeCreation = async (fileContents: EmployeeData[]) => {
  for (const employeeData of fileContents) {
    let siteNo;
    let departmentNo;

    let site = await Site.findOne({ siteName: employeeData.site });
    if (!site) {
      siteNo = generateSiteNumber();
      site = await Site.create({ siteName: employeeData.site, siteNo });
    }
    let department = await Department.findOne({
      deapartmentName: employeeData.department,
    });
    if (!department) {
      departmentNo = generateDepartmentNumber();
      department = await Department.create({
        deapartmentName: employeeData.department,
        departmentNo,
      });
    }

    await Employee.create({
      firstName: employeeData.firstName,
      middleName: employeeData.middleName,
      lastName: employeeData.lastName,
      site: site._id,
      department: department._id,
    });
  }
};
