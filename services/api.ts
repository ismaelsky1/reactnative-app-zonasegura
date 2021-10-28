import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shildapi.smartpsi.tech',
});

export default api;