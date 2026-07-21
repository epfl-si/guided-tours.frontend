export type UserType = {
  firstName: string,
  lastName: string,
  groups: string[],
  username: string,
  isAdmin: boolean,
  isGuide: boolean,
  image?: string,
  [key: string]: any
}

export type FetchUserType = {
  status?: number;
  data?: UserType;
  errors?: any;
};