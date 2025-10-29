import type { AxiosResponse } from 'axios';
import api from '../api';
import type { Category } from '@/schemas';
import type { CategoryFormData } from './create-category';

export const editCategory = async (
  id: string,
  data: CategoryFormData,
): Promise<AxiosResponse<Category>> => {
  return await api.put(`/categories/${id}`, data);
};
