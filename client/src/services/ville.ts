import KySingleton from "@/lib/ky";
import { Ville } from "@/types/ville";

const api = KySingleton.getInstance();

export async function getVilles(): Promise<Ville[]> {
  return await api.get("villes").json();
}

export async function getVilleById(id: number): Promise<Ville> {
  return await api.get(`villes/${id}`).json();
}
