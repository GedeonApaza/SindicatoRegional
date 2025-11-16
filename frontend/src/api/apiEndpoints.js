// src/constants/API_ENDPOINTS.js
const API_ENDPOINTS = {
  auth: {
    token: '/token',           // Para refrescar token
    login: '/login',
    signup: '/signup',
    logout: '/logout',
    toggle2FA: '/2fa/toggle',  // activar/desactivar 2FA
    verify2FA: '/2fa/verify',
  },
  users: {
    list: '/users',
    create: '/users',
    delete: '/users',          // DELETE /users/:id
  },
  roles: {
    list: '/roles',
    create: '/roles',
    delete: '/roles',          // DELETE /roles/:id
  },
  conductores: {
    list: '/conductores',
  },
  tasks: {
    list: '/tasks',
    create: '/tasks/create',
    update: '/tasks/update',
    delete: '/tasks/delete',
  }
};

export default API_ENDPOINTS;
