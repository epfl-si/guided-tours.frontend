import type { Reservation } from "@/types/reservation";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export const ReservationsTable = ({ reservations }: { reservations: Reservation[] }) => {
  if (!reservations || reservations.length === 0) {
    return <p className="text-center text-muted-foreground p-4">Aucune réservation trouvée.</p>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date prévue</TableHead>
            <TableHead className="text-center">Participants</TableHead>
            <TableHead>Paiement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>
                {reservation.firstName} {reservation.lastName}
              </TableCell>
              <TableCell>{reservation.entreprise || "-"}</TableCell>
              <TableCell>{reservation.email}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell className="text-center">
                {reservation.numberOfParticipant}
              </TableCell>
              <TableCell>{reservation.payment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
