import { LogsTable } from "@/components/logs-table"

export default function LogsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Speed Logs</h1>
      </div>
      <LogsTable />
    </div>
  )
}
