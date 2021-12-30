import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shildapi.herokuapp.com',
});

export default api;