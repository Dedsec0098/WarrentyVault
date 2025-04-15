
import { Sidebar } from "@/components/layout/Sidebar";
import { WarrantyDetail } from "@/components/warranty/WarrantyDetail";

export default function WarrantyDetailPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <div className="container py-6">
          <WarrantyDetail />
        </div>
      </main>
    </div>
  );
}
