import { EmployeeList } from "./EmployeeList";
import type { Employee } from "../types/employee";

type Props = {
  employees: Employee[];
  error: string;
  loading: boolean;
  page: number;
  pages: number;
  search: string;
  total: number;
  onSearch: (value: string) => void;
  onPage: (page: number) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

export function EmployeeDirectory({
  employees,
  error,
  loading,
  page,
  pages,
  search,
  total,
  onSearch,
  onPage,
  onEdit,
  onDelete,
}: Props) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="mb-1 text-lg font-semibold text-neutral-900">All employees</h2>
          <p className="text-sm text-neutral-500">{total} {total === 1 ? "record" : "records"}</p>
        </div>
        <label className="w-full sm:max-w-xs">
          <span className="sr-only">Search employees</span>
          <input
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search by name or email"
            type="search"
          />
        </label>
      </div>

      {error && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
      <EmployeeList
        employees={employees}
        loading={loading}
        searching={Boolean(search.trim())}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-neutral-500">Page {page} of {pages}</span>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={page <= 1 || loading}
            onClick={() => onPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="rounded-md border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={page >= pages || loading}
            onClick={() => onPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
