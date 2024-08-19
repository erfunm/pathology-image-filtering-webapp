// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1' // Your API base URL
});

export default api;