import AsyncStorage from "@react-native-async-storage/async-storage";
import { RequestOptions } from "../@types/api.type";
import { HttpMethod, URL } from "../constants/api";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? URL;

export const storeToken = (token: string) => {
  if (typeof window !== 'undefined') {
    AsyncStorage.setItem('access_token', token);
  } 
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return AsyncStorage.getItem('access_token');
  }
  return null;
};

export async function request<T>(
  path: string,
  { method = 'GET', body, token }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const authToken = token || (await getToken());
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  return (await res.json()) as T;
}

export { API_BASE_URL };