import type { LastReservation } from "@/types/reservation";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export const LastReservationsTable = ({ lastReservations }: { lastReservations: LastReservation[] }) => {
  if (!lastReservations || lastReservations.length === 0) {
    return <p className="text-center text-muted-foreground p-4">Aucune réservation trouvée.</p>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lastReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>
                {reservation.company}
              </TableCell>
              <TableCell>{reservation.email}</TableCell>
              <TableCell>{new Date(reservation.visitDate).toLocaleDateString ()}</TableCell>
              <TableCell>
                {reservation.status.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
