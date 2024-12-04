import KySingleton from "@/lib/ky";
import { Trajet } from "@/types/trajet";

const api = KySingleton.getInstance();

export async function getTrajets(): Promise<Trajet[]> {
  return await api.get("trajets").json();
}

export async function reserver(id: number): Promise<string> {
  return await api.post(`trajets/${id}/inscription`).json();
}

export async function createTrajet(
  km: number,
  place_proposees: number,
  prix: number,
  id_ville_1: number,
  id_ville_2: number,
  dateT: string
): Promise<Trajet> {
  const api = KySingleton.getInstance();
  return await api
    .post("personnes/login", {
      json: { km, place_proposees, prix, id_ville_1, id_ville_2, dateT },
    })
    .json();
}
