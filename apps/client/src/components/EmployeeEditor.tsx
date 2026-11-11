import { EmployeeForm } from "./EmployeeForm";
import type { Employee, EmployeeInput } from "../types/employee";

type Props = {
  employee?: Employee;
  saving: boolean;
  onSave: (employee: EmployeeInput) => Promise<void>;
  onCancel?: () => void;
};

export function EmployeeEditor({ employee, saving, onSave, onCancel }: Props) {
  return (
    <section className="mb-5 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="mb-1 text-lg font-semibold text-neutral-900">{employee ? "Edit employee" : "Add an employee"}</h2>
        <p className="text-sm text-neutral-500">
          {employee ? "Update the employee details." : "Enter the details below to add someone to the directory."}
        </p>
      </div>
      <EmployeeForm
        key={employee?.id ?? "new"}
        employee={employee}
        saving={saving}
        onSave={onSave}
        onCancel={onCancel}
      />
    </section>
  );
}
