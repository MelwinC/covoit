import KySingleton from "@/lib/ky";

const api = KySingleton.getInstance();

export async function updateTrajet(
  id: number,
  data: {
    username: string;
    telephone: string;
  }
): Promise<void> {
  await api
    .put(`personnes/${id}`, {
      json: data,
    })
    .json();
}
