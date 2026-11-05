import { apiClient } from "./apiClient";
import type { JobPositionResponse } from "../types/jobpositions";

export const getJobPositions = async (): Promise<JobPositionResponse[]> => {
  return apiClient<JobPositionResponse[]>("/JobPositions");
};