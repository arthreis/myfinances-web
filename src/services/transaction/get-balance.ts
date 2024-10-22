import type { AxiosResponse } from 'axios';
import api from '../api';
import type { Balance } from '../interfaces';

export const getBalance = async (
  period: string,
): Promise<AxiosResponse<Balance>> => {
  return await api.get(`/transactions/balance`, {
    params: {
      period,
    },
  });
};
