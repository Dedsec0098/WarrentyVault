
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <div className="container py-6">
          <DashboardSummary />
        </div>
      </main>
    </div>
  );
}
