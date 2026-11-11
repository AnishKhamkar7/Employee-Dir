import { useState, type FormEvent } from "react";
import type { Employee, EmployeeInput, EmployeeRole } from "../types/employee";

type Props = {
  employee?: Employee;
  saving: boolean;
  onSave: (employee: EmployeeInput) => Promise<void>;
  onCancel?: () => void;
};

const roles: EmployeeRole[] = ["JUNIOR", "SENIOR", "EXECUTIVE", "ADMIN"];

export function EmployeeForm({ employee, saving, onSave, onCancel }: Props) {
  const [name, setName] = useState(employee?.name ?? "");
  const [email, setEmail] = useState(employee?.email ?? "");
  const [role, setRole] = useState<EmployeeRole>(employee?.role ?? "JUNIOR");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSave({ name: name.trim(), email: email.trim(), role });
  }

  return (
    <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onSubmit={submit}>
      <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
        <span>Name</span>
        <input
          className="min-h-10 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-normal text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          autoComplete="name"
          maxLength={100}
          onChange={(event) => setName(event.target.value)}
          placeholder="Jane Smith"
          required
          value={name}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
        <span>Email</span>
        <input
          className="min-h-10 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-normal text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          autoComplete="email"
          maxLength={254}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="jane@company.com"
          required
          type="email"
          value={email}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-neutral-700">
        <span>Role</span>
        <select className="min-h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-normal text-neutral-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" onChange={(event) => setRole(event.target.value as EmployeeRole)} value={role}>
          {roles.map((item) => (
            <option key={item} value={item}>{item.charAt(0) + item.slice(1).toLowerCase()}</option>
          ))}
        </select>
      </label>
      <div className="flex justify-end gap-2 sm:col-span-2 lg:col-span-3">
        {onCancel && <button className="rounded-md border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50" onClick={onCancel} type="button">Cancel</button>}
        <button className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50" disabled={saving} type="submit">
          {saving ? "Saving…" : employee ? "Save changes" : "Add employee"}
        </button>
      </div>
    </form>
  );
}
