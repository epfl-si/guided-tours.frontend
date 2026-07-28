import { Navigate, Outlet } from "react-router";
import type { UserType } from "@/lib/types";
import { LoadingPage } from "../pages/Loading"

export const RequireAdmin = ({ user }: { user: UserType }) => {
  if (!user.username) {
    return <LoadingPage />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
