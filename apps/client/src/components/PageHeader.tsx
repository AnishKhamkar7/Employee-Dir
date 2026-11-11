type Props = { total: number };

export function PageHeader({ total }: Props) {
  return (
    <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="mb-2 text-xs font-bold tracking-widest text-indigo-600">PEOPLE</p>
        <h1 className="mb-1 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Employee directory</h1>
        <p className="text-sm text-neutral-500">Manage your team in one place.</p>
      </div>
      <span className="w-fit rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-600">
        {total} {total === 1 ? "employee" : "employees"}
      </span>
    </header>
  );
}
