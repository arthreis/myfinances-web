import type { TransactionForm } from '@/pages/Home/FormTransaction';
import api from '../api';

export const editTransaction = async (id: string, data: TransactionForm) => {
  return await api.put(`/transactions/${id}`, data);
};
