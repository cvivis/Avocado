import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.125.211.176:8080/api'
});

export default api;
