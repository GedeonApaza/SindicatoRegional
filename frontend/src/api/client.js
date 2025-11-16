import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s timeout
});

// Interceptor de respuesta global
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error API:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No hubo respuesta del servidor');
    } else {
      console.error('Error al configurar la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

export default client;
