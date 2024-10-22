import type { TransactionForm } from '../../pages/Home/FormTransaction';
import api from '../api';
import type { Transaction } from '../interfaces';

export const editTransaction = async (id: string, data: TransactionForm) => {
  return await api.put(`/transactions/${id}`, data);
};
