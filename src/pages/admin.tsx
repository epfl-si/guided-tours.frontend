import type { Reservation } from "@/types/reservation"
import { ReservationsTable } from "@/components/reservations/tables";

export default function Admin() {

  const reservations: Reservation[] = [
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      entreprise: "TechCorp SA",
      email: "jean.dupont@techcorp.com",
      phone: "+41 79 123 45 67",
      address: "Avenue de l'Innovation 12",
      additionnalAddress: "Étage 4",
      city: "Lausanne",
      zip: 1015,
      region: "Vaud",
      country: "Suisse",
      date: "2026-08-15",
      createdAt: new Date("2026-07-28T10:30:00Z"),
      payment: "Carte de crédit",
      numberOfParticipant: 5,
      statusId: 1,
      languageId: 1,
      placeId: 2
    },
    {
      id: 2,
      firstName: "Alice",
      lastName: "Martin",
      entreprise: "",
      email: "alice.martin@gmail.com",
      phone: "+33 6 12 34 56 78",
      address: "10 Rue de la Paix",
      additionnalAddress: "",
      city: "Paris",
      zip: 75002,
      region: "Île-de-France",
      country: "France",
      date: "2026-08-20",
      createdAt: new Date("2026-07-30T14:15:00Z"),
      payment: "PayPal",
      numberOfParticipant: 2,
      statusId: 2,
      languageId: 2,
      placeId: 1
    },
    {
      id: 3,
      firstName: "Luca",
      lastName: "Rossi",
      entreprise: "Design Studio",
      email: "luca.rossi@designstudio.it",
      phone: "+39 340 123 4567",
      address: "Via Roma 45",
      additionnalAddress: "Bâtiment B",
      city: "Milan",
      zip: 20121,
      region: "Lombardie",
      country: "Italie",
      date: "2026-09-05",
      createdAt: new Date("2026-07-31T09:00:00Z"),
      payment: "Virement bancaire",
      numberOfParticipant: 12,
      statusId: 1,
      languageId: 3,
      placeId: 3
    }
  ];
  return (
    <>
      <h1>Admin</h1>
      <ReservationsTable reservations={reservations}/>
    </>
  )
}
