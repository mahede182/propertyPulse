import { request } from './client';

export interface Message {
  id: string;
  text: string;
  senderId: string;
  receiverId?: string;
  projectId?: string;
  createdAt?: string;
}

export type CreateMessagePayload = Omit<Message, 'id'>;

export function getMessages() {
  return request<Message[]>('/messages');
}

export function createMessage(body: CreateMessagePayload) {
  return request<Message>('/messages', {
    method: 'POST',
    body,
  });
}