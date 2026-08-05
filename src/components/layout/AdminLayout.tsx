import { Outlet } from "react-router";
import { AdminNav } from "@/components/admin/Nav";

export default function AdminLayout() {
  return (
    <div className="flex w-full flex-1">
      <AdminNav />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
