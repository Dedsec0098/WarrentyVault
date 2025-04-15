
import { Sidebar } from "@/components/layout/Sidebar";
import { AddWarrantyForm } from "@/components/warranty/AddWarrantyForm";

export default function AddWarrantyPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <div className="container max-w-4xl py-6">
          <AddWarrantyForm />
        </div>
      </main>
    </div>
  );
}
