import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shildapi.smartpsi.online',
});

export default api;