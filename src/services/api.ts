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
  console.log('TMDB_ACCESS_TOKEN:', TMDB_ACCESS_TOKEN);
  // You can add authorization headers here if needed
  console.log('Request :', config);
  return config;
});

Api.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.log('Error:', error); // Add this line
    return Promise.reject(error);
  }
);

export default Api;