import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Index from "./components/index";
import Rutas from './components/mapas/rutas'; // la nueva vista
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;