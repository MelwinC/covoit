import KySingleton from "@/lib/ky";
import { Ville } from "@/types/ville";

const api = KySingleton.getInstance();

export async function getVilles(): Promise<Ville[]> {
  const response: Ville[] = await api.get("villes").json();
  return response.sort((ville1, ville2) => ville1.ville.localeCompare(ville2.ville));
}

export async function getVilleById(id: number): Promise<Ville> {
  return await api.get(`villes/${id}`).json();
}
