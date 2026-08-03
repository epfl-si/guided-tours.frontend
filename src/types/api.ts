import type { UserType } from "./user";

export type FetchUserType = {
  status?: number;
  data?: UserType;
  errors?: any;
};
