import { apiCall } from "@/lib/api";

export async function fetchVisitTitle(
  placeId: number | undefined
): Promise<string> {
  const url = `place/${placeId}`;
  if (!placeId) {
    throw new Error('placeId is required to fetch visit title');
  }

  return await apiCall(url, {
    method: 'GET',
  });
}
