export type RegistrationFormType = {
  firstName: string,
  lastName: string,
  company: string,
  email: string,
  phone: string,
  address: string,
  additionnalAddress: string,
  city: string,
  region: string,
  zip: string,
  country: string,
  visitDate: string,
  visitTime: string,
  numberOfParticipant: number,
  languageId: number,
  comments: string,
  gdprConsent: boolean,
}

type Translated = {
  [langCode: string]: string;
};

type Conditions = {
  [langCode: string]: [string];
};
export type PlaceInformationType = {
  id: number;
  title: Translated;
  picture: string;
  description: Translated;
  createdAt: Date;
  maxPerGroup: number;
  price: number;
  conditions: Conditions;
  Languages: {
    id: number;
    name: string;
  }[];
};
