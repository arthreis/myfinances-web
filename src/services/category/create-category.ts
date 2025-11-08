import type { AxiosResponse } from 'axios';
import api from '../api';
import type { Category } from '@/schemas';

export interface CategoryFormData {
  title: string;
  icon: string;
  color: string;
}

export const createCategory = async (
  data: CategoryFormData,
): Promise<AxiosResponse<Category>> => {
  return await api.post('/categories', data);
};
