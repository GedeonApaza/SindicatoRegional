import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import Index from "./components/index";
import Rutas from './components/mapas/rutas'; // la nueva vista
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import UsuariosView from "./components/dashboard/UsuariosView";
import RolesView from "./components/dashboard/RolesView";
import PasajerosView from "./components/dashboard/PasajerosView";
import ConductoresView from "./components/dashboard/ConductoresView";
import VehiculosView from "./components/dashboard/VehiculosView";
import ViajesView from "./components/dashboard/ViajesView";
import PasajerosViajesView from "./components/dashboard/PasajerosViajesView";
import ConfiguracionView from "./components/dashboard/ConfiguracionView";
import { AuthProvider } from "./context/AuthContext";
import { DashboardDataProvider } from "./context/DashboardDataContext";

const DashboardWithProviders = () => (
  <AuthProvider>
    <DashboardDataProvider>
      <Dashboard />
    </DashboardDataProvider>
  </AuthProvider>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardWithProviders />}>
          <Route path="usuarios" element={<UsuariosView />} />
          <Route path="roles" element={<RolesView />} />
          <Route path="pasajeros" element={<PasajerosView />} />
          <Route path="conductores" element={<ConductoresView />} />
          <Route path="vehiculos" element={<VehiculosView />} />
          <Route path="viajes" element={<ViajesView />} />
          <Route path="pasajeros-viajes" element={<PasajerosViajesView />} />
          <Route path="configuracion" element={<ConfiguracionView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;