import { apiCall } from "@/lib/api";

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
