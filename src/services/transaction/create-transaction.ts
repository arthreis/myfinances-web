import type { TransactionForm } from '../../pages/Home/FormTransaction';
import api from '../api';

export const createTransaction = async (data: TransactionForm) => {
  return await api.post(`/transactions`, data);
};
