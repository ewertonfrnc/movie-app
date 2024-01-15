import axios from 'axios';
import { API_URL, ACCESS_TOKEN_AUTH } from '@env';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
  },
});
