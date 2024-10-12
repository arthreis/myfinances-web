import type { TransactionForm } from '../../pages/FormTransaction';
import api from '../api'
import type { Transaction } from '../interfaces'

export const editTransaction = async (id: string, data: TransactionForm) => {
  await api.put(`/transactions/${id}`, data);
}
