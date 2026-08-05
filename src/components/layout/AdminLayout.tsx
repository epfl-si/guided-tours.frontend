import { Outlet } from "react-router";
import { AdminNav } from "@/components/admin/Nav";

export default function AdminLayout() {
  return (
    <div className="flex w-full flex-1">
      <AdminNav />
      <Outlet />
    </div>
  );
}
