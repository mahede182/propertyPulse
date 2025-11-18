import { request } from './client';

export interface Transaction {
  id: string;
  amount: number;
  projectId?: string;
  userId?: string;
  createdAt?: string;
  // extend as needed
}

export type CreateTransactionPayload = Omit<Transaction, 'id'>;

export function getTransactions() {
  return request<Transaction[]>('/transactions');
}

export function createTransaction(body: CreateTransactionPayload) {
  return request<Transaction>('/transactions', {
    method: 'POST',
    body,
  });
}