import { Request, Response } from "express";
import Job from "../models/jobModel";
import { handleSiteCreation } from "../handlers/site-handler";
import { handleDepartmentCreation } from "../handlers/department-handler";
import { handleEmployeeCreation } from "../handlers/employee-handler";

export const processData = async (req: Request, res: Response) => {
  const { email, fileType, fileContents } = req.body;
  let job;
  try {
    job = await Job.create({ email, status: "pending" });

    switch (fileType) {
      case "site file":
        await handleSiteCreation(fileContents);
        break;
      case "department file":
        await handleDepartmentCreation(fileContents);
        break;
      case "employee file":
        await handleEmployeeCreation(fileContents);
        break;
      default:
        await Job.findByIdAndUpdate(job._id, { status: "fail" });
        res.status(400).json({ message: "Invalid type" });
        return;
    }

    await Job.findByIdAndUpdate(job._id, { status: "success" });
    res.json({ message: `${fileType} created successfully` });
  } catch (error) {
    console.error(error);
    if (job) {
      await Job.findByIdAndUpdate(job._id, { status: "fail" });
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
