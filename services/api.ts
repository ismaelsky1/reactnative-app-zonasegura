import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smartpsi.tech',
});

export default api;