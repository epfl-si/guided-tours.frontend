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

export type RegistrationFormType = {
  firstName: string,
  lastName: string,
  company: string,
  email: string,
  phone: string,
  address: string,
  addressComplement: string,
  city: string,
  region: string,
  postalCode: string,
  country: string,
  visitDate: string,
  visitTime: string,
  numberOfParticipants: string,
  language: string,
  comments: string,
  gdprConsent: boolean,
}