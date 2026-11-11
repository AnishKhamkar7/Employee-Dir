import { z } from "zod";

export const employeeIdSchema = z.string().trim().min(1, "Employee ID is required");

export const employeeRoleSchema = z.enum([
  "JUNIOR",
  "SENIOR",
  "EXECUTIVE",
  "ADMIN",
]);

export const createEmployeeSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  role: employeeRoleSchema,
});

export const updateEmployeeSchema = createEmployeeSchema
  .partial()
  .refine((employee) => Object.keys(employee).length > 0, {
    message: "At least one field must be provided",
  });

export const listEmployeesQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
export type ListEmployeesQuery = z.infer<typeof listEmployeesQuerySchema>;
