import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useAuth } from "./AuthContext";
import { useHandlers } from "../utils/useHandlers";

const DashboardDataContext = createContext(null);

export const DashboardDataProvider = ({ children }) => {
  const { token, axiosJWT } = useAuth();

  const [alertas, setAlertas] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [pasajeros, setPasajeros] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [pasajerosViajes, setPasajerosViajes] = useState([]);
  const [viajes, setViajes] = useState([]);

  const [previousAlertCount, setPreviousAlertCount] = useState(0);
  const [showNewAlertModal, setShowNewAlertModal] = useState(false);
  const [newAlertas, setNewAlertas] = useState([]);
  const [alertasVistas, setAlertasVistas] = useState([]);

  const getUsers = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axiosJWT.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [axiosJWT, token]);

  const getRoles = useCallback(async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/roles", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, [axiosJWT, token]);

  const getConductores = useCallback(async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/conductores", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConductores(response.data);
    } catch (error) {
      console.error("Error fetching conductores:", error);
    }
  }, [axiosJWT, token]);

  const getVehiculos = useCallback(async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/vehiculos", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error fetching vehiculos:", error);
    }
  }, [axiosJWT, token]);

  const getPasajeros = useCallback(async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/pasajeros", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasajeros(response.data);
    } catch (error) {
      console.error("Error fetching pasajeros:", error);
    }
  }, [axiosJWT, token]);

  const getViajes = useCallback(async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/viajes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setViajes(response.data);
    } catch (error) {
      console.error("Error fetching viajes:", error);
    }
  }, [axiosJWT, token]);

  const getPasajerosViajes = useCallback(async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/pasajeros_viaje", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasajerosViajes(response.data);
    } catch (error) {
      console.error("Error fetching pasajeros viajes:", error);
    }
  }, [axiosJWT, token]);

  const getAlertas = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axiosJWT.get("http://localhost:5000/alertas", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const todasLasAlertas = response.data;
      const alertasNoVistas = todasLasAlertas.filter(
        (alerta) => !alertasVistas.includes(alerta.id_alerta)
      );

      if (previousAlertCount > 0 && alertasNoVistas.length > previousAlertCount) {
        const cantidadNuevas = alertasNoVistas.length - previousAlertCount;
        const alertasNuevas = alertasNoVistas.slice(-cantidadNuevas);
        setNewAlertas(alertasNuevas);
        setShowNewAlertModal(true);
      }

      setAlertas(alertasNoVistas);
      setPreviousAlertCount(alertasNoVistas.length);
    } catch (error) {
      console.error("Error fetching alertas:", error);
    }
  }, [alertasVistas, axiosJWT, previousAlertCount, token]);

  const handleOpenAlertModal = useCallback(() => {
    setNewAlertas(alertas);
    setShowNewAlertModal(true);
  }, [alertas]);

  const handleCloseAlertModal = useCallback(() => {
    try {
      const alertaIds = newAlertas.map((alerta) => alerta.id_alerta);
      const alertasVistasActualizadas = [...alertasVistas, ...alertaIds];
      setAlertasVistas(alertasVistasActualizadas);
      localStorage.setItem("alertasVistas", JSON.stringify(alertasVistasActualizadas));

      setShowNewAlertModal(false);
      setNewAlertas([]);

      const alertasActualizadas = alertas.filter(
        (alerta) => !alertaIds.includes(alerta.id_alerta)
      );
      setAlertas(alertasActualizadas);
      setPreviousAlertCount(alertasActualizadas.length);
    } catch (error) {
      console.error("Error al cerrar modal de alertas:", error);
      setShowNewAlertModal(false);
      setNewAlertas([]);
    }
  }, [alertas, alertasVistas, newAlertas]);

  useEffect(() => {
    const alertasVistasGuardadas = localStorage.getItem("alertasVistas");
    if (alertasVistasGuardadas) {
      setAlertasVistas(JSON.parse(alertasVistasGuardadas));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    getAlertas();
    getUsers();
    getRoles();
    getConductores();
    getVehiculos();
    getPasajeros();
    getViajes();
    getPasajerosViajes();
  }, [
    token,
    getAlertas,
    getUsers,
    getRoles,
    getConductores,
    getVehiculos,
    getPasajeros,
    getViajes,
    getPasajerosViajes
  ]);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      getAlertas();
    }, 3000);

    return () => clearInterval(interval);
  }, [getAlertas, token]);

  const handlers = useHandlers(axiosJWT, token, {
    getUsers,
    getPasajeros,
    getViajes,
    getPasajerosViajes,
    getVehiculos,
    getConductores,
    getRoles
  });

  const value = useMemo(
    () => ({
      alertas,
      users,
      roles,
      conductores,
      pasajeros,
      vehiculos,
      viajes,
      pasajerosViajes,
      showNewAlertModal,
      newAlertas,
      handleCloseAlertModal,
      handleOpenAlertModal,
      handlers
    }),
    [
      alertas,
      conductores,
      handlers,
      handleCloseAlertModal,
      handleOpenAlertModal,
      newAlertas,
      pasajeros,
      pasajerosViajes,
      roles,
      showNewAlertModal,
      users,
      vehiculos,
      viajes
    ]
  );

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error("useDashboardData debe usarse dentro de DashboardDataProvider");
  }
  return context;
};
