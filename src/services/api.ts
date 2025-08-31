import axios from 'axios';
import { Configs } from '../configs';
import { TMDB_ACCESS_TOKEN } from '@env';

const Api = axios.create({
  baseURL: Configs.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

Api.interceptors.request.use(config => {
  // You can add authorization headers here if needed
  return config;
});

Api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  // Handle errors globally
  return Promise.reject(error);
});

export default Api;