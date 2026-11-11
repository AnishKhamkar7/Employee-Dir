import { prisma } from "../../lib/prisma.js";
import type {
  CreateEmployeeInput,
  ListEmployeesQuery,
  UpdateEmployeeInput,
} from "./schema.js";

export const listEmployees = async ({ search, page, limit }: ListEmployeesQuery) => {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const [employees, total] = await prisma.$transaction([
    prisma.employee.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.employee.count({ where }),
  ]);

  return {
    employees,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const findEmployeeById = (id: string) =>
  prisma.employee.findUnique({ where: { id } });

export const createEmployee = (data: CreateEmployeeInput) =>
  prisma.employee.create({ data });

export const updateEmployee = (id: string, data: UpdateEmployeeInput) =>
  prisma.employee.update({ where: { id }, data });

export const deleteEmployee = (id: string) =>
  prisma.employee.delete({ where: { id } });
