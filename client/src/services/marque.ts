import KySingleton from "@/lib/ky";
import { Marque } from "@/types/marque";

const api = KySingleton.getInstance();

export async function getMarques(): Promise<Marque[]> {
  return await api.get("marques").json();
}