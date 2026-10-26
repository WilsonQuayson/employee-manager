import type { JobPositionResponse } from "../types/jobpositions";

export async function getJobPositions(): Promise<JobPositionResponse[]> {
    const response = await fetch("https://localhost:7101/api/JobPositions");

    if (!response.ok) {
        throw new Error("Failed to fetch job positions");
    }

    return response.json();
}