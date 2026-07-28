import { Navigate, Outlet } from "react-router";
import type { UserType } from "@/lib/types";
import { Spinner } from "../ui/spinner";

export const RequireAdmin = ({ user }: { user: UserType }) => {
  if (!user.username) {
    return <Spinner className="size-10" />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
