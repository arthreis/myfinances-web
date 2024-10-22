import type { AxiosResponse } from 'axios';
import api from '../api';
import type { Category } from '../interfaces';

export interface CategoryFormData {
  title: string;
  icon: string;
  background_color_dark: string;
  background_color_light: string;
}

export const editCategory = async (
  id: string,
  data: CategoryFormData,
): Promise<AxiosResponse<Category>> => {
  return await api.put(`/categories/${id}`, data);
};
