import { request } from './client';

export interface Project {
  id: string;
  name: string;
  description?: string;
}

export type CreateProjectPayload = Omit<Project, 'id'>;
export type UpdateProjectPayload = Partial<Omit<Project, 'id'>>;

export function getProjects() {
  return request<Project[]>('/projects');
}

export function getProject(id: string) {
  return request<Project>(`/projects/${id}`);
}

export function createProject(body: CreateProjectPayload) {
  return request<Project>('/projects', {
    method: 'POST',
    body,
  });
}

export function updateProject(id: string, body: UpdateProjectPayload) {
  return request<Project>(`/projects/${id}`, {
    method: 'PUT',
    body,
  });
}

export function deleteProject(id: string) {
  return request<void>(`/projects/${id}`, {
    method: 'DELETE',
  });
}