import type { Employee } from "../types/employee";

type Props = {
  employees: Employee[];
  loading: boolean;
  searching: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

export function EmployeeList({ employees, loading, searching, onEdit, onDelete }: Props) {
  if (loading) return <p className="border-t border-neutral-100 py-8 text-center text-sm text-neutral-500">Loading employees…</p>;

  if (employees.length === 0) {
    return <p className="border-t border-neutral-100 py-8 text-center text-sm text-neutral-500">{searching ? "No employees match your search." : "No employees yet. Add one above to get started."}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="text-xs font-medium text-neutral-500">
          <tr>
            <th className="border-t border-neutral-100 px-2.5 py-3">Name</th>
            <th className="border-t border-neutral-100 px-2.5 py-3">Email</th>
            <th className="border-t border-neutral-100 px-2.5 py-3">Role</th>
            <th className="border-t border-neutral-100 px-2.5 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border-t border-neutral-100 px-2.5 py-3 font-medium text-neutral-900">{employee.name}</td>
              <td className="border-t border-neutral-100 px-2.5 py-3 text-neutral-600">{employee.email}</td>
              <td className="border-t border-neutral-100 px-2.5 py-3">
                <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs capitalize text-neutral-700">{employee.role.toLowerCase()}</span>
              </td>
              <td className="border-t border-neutral-100 px-2.5 py-3">
                <div className="flex justify-end gap-1">
                  <button className="rounded-md border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50" onClick={() => onEdit(employee)} type="button">Edit</button>
                  <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50" onClick={() => onDelete(employee)} type="button">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
