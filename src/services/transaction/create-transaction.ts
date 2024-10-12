import type { TransactionForm } from '../../pages/FormTransaction';
import api from '../api'

export const createTransaction = async (data: TransactionForm) => {
  await api.post(`/transactions`, data);
}
