import { Router } from "express";
import {
  createEmployeeHandler,
  deleteEmployeeHandler,
  getEmployeeHandler,
  listEmployeesHandler,
  updateEmployeeHandler,
} from "./handler.js";

export const employeeRouter: ReturnType<typeof Router> = Router();

employeeRouter.get("/", listEmployeesHandler);
employeeRouter.get("/:id", getEmployeeHandler);
employeeRouter.post("/", createEmployeeHandler);
employeeRouter.patch("/:id", updateEmployeeHandler);
employeeRouter.delete("/:id", deleteEmployeeHandler);
