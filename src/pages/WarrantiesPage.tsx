
import { Sidebar } from "@/components/layout/Sidebar";
import { WarrantyList } from "@/components/warranty/WarrantyList";

export default function WarrantiesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <div className="container py-6">
          <WarrantyList />
        </div>
      </main>
    </div>
  );
}
