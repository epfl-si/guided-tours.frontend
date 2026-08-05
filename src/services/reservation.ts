import { apiCall } from "@/lib/api";
import type { LastReservation } from "@/types/reservation";

export async function postRegistration(
  data: Record<string, any>
) {
  const url = `reservation/register`;
  if (!data) {
    throw new Error('Data is required to post registration');
  }
  return await apiCall(url, {
    method: 'POST',
    body: data
  });
}

export async function getLastReservations() {
  return await apiCall<LastReservation[]>('reservation/last', {
    method: 'GET',
  })
}
