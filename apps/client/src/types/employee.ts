export type EmployeeRole = "JUNIOR" | "SENIOR" | "EXECUTIVE" | "ADMIN";

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeInput = Pick<Employee, "name" | "email" | "role">;

export type EmployeePage = {
  employees: Employee[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
