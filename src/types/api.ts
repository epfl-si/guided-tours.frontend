import type { UserType } from "@/types/user";

export type FetchUserType = {
  status?: number;
  data?: UserType;
  errors?: any;
};
