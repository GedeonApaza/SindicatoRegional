import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSetup2FA, setShowSetup2FA] = useState(false);

  const axiosJWT = useMemo(() => axios.create(), []);

  const decodeToken = useCallback((accessToken) => {
    const decoded = jwtDecode(accessToken);

    setToken(accessToken);
    setExpire(decoded.exp);
    setIs2FAEnabled(Boolean(decoded.is2FAEnabled));
    setUser({
      id_usuario: decoded.id_usuario,
      nombre_completo: decoded.nombre_completo,
      apellido_paterno: decoded.apellido_paterno,
      apellido_materno: decoded.apellido_materno,
      email: decoded.email,
      foto_perfil: decoded.foto_perfil,
      is2FAEnabled: decoded.is2FAEnabled,
      rol: decoded.rol
    });
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      decodeToken(response.data.accessToken);
    } catch (error) {
      navigate("/");
    }
  }, [decodeToken, navigate]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    const requestIntercept = axiosJWT.interceptors.request.use(
      async (config) => {
        try {
          const currentDate = new Date();
          if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get("http://localhost:5000/token");
            decodeToken(response.data.accessToken);
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          } else if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        } catch (error) {
          navigate("/");
          return Promise.reject(error);
        }
      },
      (error) => Promise.reject(error)
    );

    return () => axiosJWT.interceptors.request.eject(requestIntercept);
  }, [axiosJWT, decodeToken, expire, navigate, token]);

  const logout = useCallback(async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setToken("");
      setUser(null);
      navigate("/");
    }
  }, [navigate]);

  const handleToggle2FA = useCallback(async () => {
    if (!user?.email) {
      alert("Usuario no cargado aún");
      return;
    }

    if (!is2FAEnabled) {
      setShowSetup2FA(true);
      return;
    }

    try {
      const response = await axiosJWT.post(
        "http://localhost:5000/2fa/toggle",
        { email: user.email, enable: false }
      );

      setIs2FAEnabled(false);
      alert(response.data.msg || "2FA desactivado");
    } catch (error) {
      console.error("Error al desactivar 2FA:", error);
      alert("Error al desactivar 2FA");
    }
  }, [axiosJWT, is2FAEnabled, user]);

  const handleSetup2FAComplete = useCallback(async () => {
    if (!user?.email) {
      alert("Usuario no cargado aún");
      return;
    }

    try {
      await axiosJWT.post(
        "http://localhost:5000/2fa/toggle",
        { email: user.email, enable: true }
      );

      setIs2FAEnabled(true);
      setShowSetup2FA(false);
      alert("¡2FA configurado y activado exitosamente!");
    } catch (error) {
      console.error("Error al activar 2FA:", error);
      alert("Error al activar 2FA");
    }
  }, [axiosJWT, user]);

  const handleSetup2FACancel = useCallback(() => {
    setShowSetup2FA(false);
  }, []);

  const value = {
    user,
    token,
    axiosJWT,
    refreshToken,
    logout,
    is2FAEnabled,
    showSetup2FA,
    handleToggle2FA,
    handleSetup2FAComplete,
    handleSetup2FACancel
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
