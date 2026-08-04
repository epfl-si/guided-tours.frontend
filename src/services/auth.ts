import { apiCall } from "@/lib/api";
import type { UserType } from "@/types/user";

export async function fetchConnectedUser(): Promise<UserType> {
  return await apiCall<UserType>("/api/user/me");
}
