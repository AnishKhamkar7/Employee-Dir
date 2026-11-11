import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { employeesApi } from "../api/employees";
import type { Employee, EmployeeInput } from "../types/employee";

const pageSize = 10;
const employeeKey = ["employees"] as const;

function getMessage(error: unknown) {
  if (isAxiosError<{ error?: string }>(error)) {
    return error.response?.data?.error ?? "Could not reach the server.";
  }

  return "Something went wrong. Please try again.";
}

export function useEmployees() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Employee>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [actionError, setActionError] = useState("");

  const query = useQuery({
    queryKey: [...employeeKey, search.trim(), page, pageSize],
    queryFn: ({ signal }) =>
      employeesApi.list({ search: search.trim(), page, limit: pageSize }, signal),
    placeholderData: keepPreviousData,
  });

  const saveMutation = useMutation({
    mutationFn: ({ id, input }: { id?: string; input: EmployeeInput }) =>
      id ? employeesApi.update(id, input) : employeesApi.create(input),
    onSuccess: async (_employee, { id }) => {
      setEditing(undefined);
      if (!id) {
        setSearch("");
        setPage(1);
      }
      await queryClient.invalidateQueries({ queryKey: employeeKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: employeesApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: employeeKey }),
  });

  async function saveEmployee(input: EmployeeInput) {
    setActionError("");
    try {
      await saveMutation.mutateAsync({ id: editing?.id, input });
    } catch (error) {
      setActionError(getMessage(error));
    }
  }

  async function deleteEmployee(employee: Employee) {
    if (!window.confirm(`Delete ${employee.name}?`)) return;

    setActionError("");
    try {
      await deleteMutation.mutateAsync(employee.id);
      if (query.data?.employees.length === 1 && page > 1) {
        setPage((value) => value - 1);
      }
    } catch (error) {
      setActionError(getMessage(error));
    }
  }

  function changeSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return {
    employees: query.data?.employees ?? [],
    editing,
    setEditing,
    search,
    changeSearch,
    page,
    setPage,
    pages: Math.max(1, query.data?.pagination.totalPages ?? 1),
    total: query.data?.pagination.total ?? 0,
    loading: query.isPending || query.isFetching,
    saving: saveMutation.isPending,
    error: actionError || (query.error ? getMessage(query.error) : ""),
    saveEmployee,
    deleteEmployee,
  };
}
