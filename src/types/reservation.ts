export type Reservation = {
  id: number;
  firstName: string;
  lastName: string;
  entreprise: string;
  email: string;
  phone: string;
  address: string;
  additionnalAddress: string;
  city: string;
  zip: number;
  region: string;
  country: string;
  date: string;
  createdAt: Date;
  payment: string;
  numberOfParticipant: number;
  statusId: number;
  languageId: number;
  placeId: number;
}
