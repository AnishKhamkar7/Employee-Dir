import axios from "axios";
import type { Employee, EmployeeInput, EmployeePage } from "../types/employee";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

export const employeesApi = {
  async list(
    params: { search: string; page: number; limit: number },
    signal?: AbortSignal,
  ) {
    const response = await api.get<EmployeePage>("/employees", { params, signal });
    return response.data;
  },

  async create(employee: EmployeeInput) {
    const response = await api.post<{ employee: Employee }>("/employees", employee);
    return response.data.employee;
  },

  async update(id: string, employee: EmployeeInput) {
    const response = await api.put<{ employee: Employee }>(`/employees/${id}`, employee);
    return response.data.employee;
  },

  async remove(id: string) {
    await api.delete(`/employees/${id}`);
  },
};
