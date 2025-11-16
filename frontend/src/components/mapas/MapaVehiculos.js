import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { obtenerVehiculos } from '../../services/api';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapaVehiculos = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-68.1193, -16.4897], // La Paz
        zoom: 11
      });
    }
    
    cargarVehiculos();
    const interval = setInterval(cargarVehiculos, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const cargarVehiculos = async () => {
    const data = await obtenerVehiculos();
    setVehiculos(data);
    actualizarMarcadores(data);
  };

  return <div ref={mapContainer} style={{ height: '600px' }} />;
};