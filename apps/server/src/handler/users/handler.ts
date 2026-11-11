import type { RequestHandler } from "express";
import {
  createEmployeeSchema,
  employeeIdSchema,
  listEmployeesQuerySchema,
  updateEmployeeSchema,
} from "./schema.js";
import * as employeeService from "./service.js";
import { ErrorFactory } from "../error-handler.js";

export const listEmployeesHandler: RequestHandler = async (
  request,
  response,
  next,
) => {
  const query = listEmployeesQuerySchema.safeParse(request.query);
  if (!query.success) {
    ErrorFactory(response, query.error.issues);
    return;
  }

  try {
    response.json(await employeeService.listEmployees(query.data));
  } catch (error) {
    next(error);
  }
};

export const getEmployeeHandler: RequestHandler = async (
  request,
  response,
  next,
) => {
  const id = employeeIdSchema.safeParse(request.params.id);
  if (!id.success) {
    ErrorFactory(response, id.error.issues);
    return;
  }

  try {
    const employee = await employeeService.findEmployeeById(id.data);
    if (!employee) {
      response.status(404).json({ error: "Employee not found" });
      return;
    }

    response.json({ employee });
  } catch (error) {
    next(error);
  }
};

export const createEmployeeHandler: RequestHandler = async (
  request,
  response,
  next,
) => {
  const employee = createEmployeeSchema.safeParse(request.body);
  if (!employee.success) {
    ErrorFactory(response, employee.error.issues);
    return;
  }

  try {
    const created = await employeeService.createEmployee(employee.data);
    response.status(201).json({ employee: created });
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeHandler: RequestHandler = async (
  request,
  response,
  next,
) => {
  const id = employeeIdSchema.safeParse(request.params.id);
  if (!id.success) {
    ErrorFactory(response, id.error.issues);
    return;
  }

  const employee = updateEmployeeSchema.safeParse(request.body);
  if (!employee.success) {
    ErrorFactory(response, employee.error.issues);
    return;
  }

  try {
    const updated = await employeeService.updateEmployee(
      id.data,
      employee.data,
    );
    response.json({ employee: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployeeHandler: RequestHandler = async (
  request,
  response,
  next,
) => {
  const id = employeeIdSchema.safeParse(request.params.id);
  if (!id.success) {
    ErrorFactory(response, id.error.issues);
    return;
  }

  try {
    const deleted = await employeeService.deleteEmployee(id.data);
    response.json({ employee: deleted });
  } catch (error) {
    next(error);
  }
};
