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
    .post("trajets", {
      json: { km, place_proposees, prix, id_ville_1, id_ville_2, dateT },
    })
    .json();
}

export async function getTrajetsConducteur(): Promise<Trajet[]> {
  const response: Trajet[] = await api.get(`trajets/createur`).json();
  return response;
}

export async function getTrajetsPassager(): Promise<Trajet[]> {
  return await api.get(`trajets/inscrits`).json();
}

export async function deleteTrajet(id: number): Promise<void> {
  await api.delete(`trajets/${id}`).json();
}

export async function updateTrajet(
  id: number,
  data: {
    km: number;
    place_proposees: number;
    prix: number;
    id_ville_1: number;
    id_ville_2: number;
    dateT: string;
  }
): Promise<void> {
  await api
    .put(`trajets/${id}`, {
      json: data,
    })
    .json();
}
