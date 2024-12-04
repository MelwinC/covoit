import KySingleton from "@/lib/ky";
import { User } from "@/types/user";

const TOKEN_KEY = "covoit_token";

interface DecodedToken {
  token: {
    type: string;
    name: string;
    token: string;
    abilities: string[];
    lastUsedAt: string;
    expiresAt: string;
  };
  user: User;
}

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = (): boolean => {
  const token = getToken();
  return !!token;
};

export async function getCurrentUserInfo(): Promise<User>{
  const api = KySingleton.getInstance();
  return await api.get("personnes/information").json();
}

export async function getUserInfo(id: number): Promise<User>{
  const api = KySingleton.getInstance();
  return await api.get(`personnes/${id}`).json();
}

export async function signIn(user: {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  username: string;
  password: string;
  id_ville: number;
}): Promise<DecodedToken | string> {
  const api = KySingleton.getInstance();
  const response: DecodedToken = await api
    .post("personnes/login", {
      json: { ...user },
    })
    .json();

  if ("token" in response) {
    setToken(response.token.token);
  }

  return response;
}

export async function signUp(user: {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  username: string;
  password: string;
  id_ville: number;
}): Promise<DecodedToken | string> {
  const api = KySingleton.getInstance();
  await api
    .post("personnes", {
      json: { ...user },
    })
    .json();
  return await signIn(user);
}

export function signOut() {
  removeToken();
}
