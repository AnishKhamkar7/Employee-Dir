import { EmployeeDirectory } from "./components/EmployeeDirectory";
import { EmployeeEditor } from "./components/EmployeeEditor";
import { PageHeader } from "./components/PageHeader";
import { useEmployees } from "./hooks/useEmployees";

function App() {
  const directory = useEmployees();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader total={directory.total} />
      <EmployeeEditor
        employee={directory.editing}
        saving={directory.saving}
        onSave={directory.saveEmployee}
        onCancel={directory.editing ? () => directory.setEditing(undefined) : undefined}
      />
      <EmployeeDirectory
        employees={directory.employees}
        error={directory.error}
        loading={directory.loading}
        page={directory.page}
        pages={directory.pages}
        search={directory.search}
        total={directory.total}
        onSearch={directory.changeSearch}
        onPage={directory.setPage}
        onEdit={directory.setEditing}
        onDelete={directory.deleteEmployee}
      />
    </main>
  );
}

export default App;
