import api from '../api';

export const getAllCategories = async () => {
  return await api.get('/categories');
};
