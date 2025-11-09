import axios from 'axios';

declare global {
  interface Window { __APP_CONFIG__?: { API_URL?: string } }
}

const baseURL = window.__APP_CONFIG__?.API_URL;
if (!baseURL) {
  throw new Error("API_URL não definido em runtime.");
}

export const api = axios.create({ baseURL });
export default api;
