import axios from 'axios';

const api = axios.create({
  baseURL: 'https://i9a407.p.ssafy.io/api'
});

export default api;
