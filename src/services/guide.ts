import { apiCall } from "@/lib/api";
import type { guideInfo } from "@/types/guide";

export async function getGuideInfo(): Promise<guideInfo[]> {
  console.log("Called API")
  return await apiCall<guideInfo[]>("guide");
}