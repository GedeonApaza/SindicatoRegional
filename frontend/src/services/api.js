// services/api.js - Configuración de Axios
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor para agregar token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Endpoints principales
export const obtenerUsuarios = () => api.get('/usuarios');
export const crearUsuario = (data) => api.post('/usuarios', data);
export const obtenerVehiculos = () => api.get('/vehiculos');
export const obtenerAlertas = () => api.get('/alertas');

export default api;