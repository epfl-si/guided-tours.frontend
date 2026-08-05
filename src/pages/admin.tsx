import { useEffect, useState } from "react";
import { LastReservationsTable } from "@/components/reservations/tables";
import { getLastReservations } from "@/services/reservation";
import type { LastReservation } from "@/types/reservation";
import { LoadingPage } from "./Loading";

export default function Admin() {
  const [reservations, setReservations] = useState<LastReservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getLastReservations();
      setReservations(data);
      setIsLoading(false);
    }
    fetchReservations();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-16">
      <h1 className="text-4xl pb-8 font-semibold">Admin dashboard</h1>
      <LastReservationsTable lastReservations={reservations}/>
    </div>
  )
}
