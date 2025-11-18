import { request } from './client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

export function login(body: LoginPayload) {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body,
  });
}

export interface User {
  id: string;
  name: string;
  email: string;
  // add more fields as needed
}

export type CreateUserPayload = Omit<User, 'id'>;
export type UpdateUserPayload = Partial<Omit<User, 'id'>>;

export function getUsers() {
  return request<User[]>('/users');
}

export function getUser(id: string) {
  return request<User>(`/user/${id}`);
}

export function createUser(body: CreateUserPayload) {
  return request<User>('/user', {
    method: 'POST',
    body,
  });
}

export function updateUser(id: string, body: UpdateUserPayload) {
  return request<User>(`/user/${id}`, {
    method: 'PUT',
    body,
  });
}

export function deleteUser(id: string) {
  return request<void>(`/user/${id}`, {
    method: 'DELETE',
  });
}


export interface LoginResponse {
  accessToken: string;
}
