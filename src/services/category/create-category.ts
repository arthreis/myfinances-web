import api from '../api';

export interface CategoryFormData {
  title: string;
  icon: string;
  background_color_dark: string;
  background_color_light: string;
}

export const createCategory = async (data: CategoryFormData) => {
  await api.post('/categories', data);
}
