import PasajerosViaje from "../models/pasajeros_viaje.js";
import Viajes from "../models/viajes.js";
import Vehiculos from "../models/vehiculos.js";
import Pasajeros from "../models/pasajeros.js";
// Obtener todos los pasajeros de viajes
export const getPasajerosViaje = async (req, res) => {
  try {
    const pasajeros = await PasajerosViaje.findAll();
    res.status(200).json(pasajeros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener pasajeros por viaje" });
  }
};
// Obtener un pasajero de viaje por ID
export const getPasajeroViajeById = async (req, res) => {
  try {
    const { id } = req.params;

    const pasajero = await PasajerosViaje.findByPk(id);

    if (!pasajero) {
      return res.status(404).json({ msg: "Pasajero no encontrado" });
    }

    res.status(200).json(pasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el pasajero del viaje" });
  }
};

export const createPasajeroViaje = async (req, res) => {
  try {
    const { id_viaje, id_pasajero, numero_asiento, estado } = req.body;

    // 1️ Verificar que el viaje exista
    const viaje = await Viajes.findByPk(id_viaje);
    if (!viaje) {
      return res.status(404).json({ msg: "El viaje no existe" });
    }

    // 2️ Verificar que el pasajero exista
    const pasajero = await Pasajeros.findByPk(id_pasajero);
    if (!pasajero) {
      return res.status(404).json({ msg: "El pasajero no existe" });
    }

    // 3️ Verificar que el viaje tenga vehículo asignado
    const vehiculo = await Vehiculos.findByPk(viaje.id_vehiculo);
    if (!vehiculo) {
      return res.status(400).json({ msg: "El viaje no tiene un vehículo asignado" });
    }

    // 4️ Verificar capacidad del vehículo
    const pasajerosRegistrados = await PasajerosViaje.count({ where: { id_viaje } });
    if (pasajerosRegistrados >= vehiculo.capacidad_pasajeros) {
      return res.status(400).json({
        msg: `El vehículo (${vehiculo.placa}) ya alcanzó su capacidad máxima (${vehiculo.capacidad_pasajeros} pasajeros)`
      });
    }

    // 5️ Verificar asiento ocupado
    const asientoOcupado = await PasajerosViaje.findOne({
      where: { id_viaje, numero_asiento }
    });
    if (asientoOcupado) {
      return res.status(400).json({
        msg: `El asiento N°${numero_asiento} ya está ocupado en este viaje`
      });
    }

    // 6️ Registrar pasajero en el viaje
    const nuevo = await PasajerosViaje.create({
      id_viaje,
      id_pasajero,
      numero_asiento,
      estado: estado || "registrado"
    });

    // 7️ Actualizar el estado del viaje según cantidad de pasajeros
    const totalActual = await PasajerosViaje.count({ where: { id_viaje } });

    if (totalActual < vehiculo.capacidad_pasajeros) {
      // Todavía hay asientos disponibles
      if (viaje.estado !== "programado") {
        await viaje.update({ estado: "programado" });
      }
    } else if (totalActual === vehiculo.capacidad_pasajeros) {
      // Ya se llenaron todos los asientos
  const now = new Date();
  const horaActual = now.toTimeString().slice(0,5); 
  
      await viaje.update({ estado: "en_ruta",
        hora_salida: horaActual 
       });
    }

    res.status(201).json({
      msg: "Pasajero registrado exitosamente en el viaje",
      pasajero: nuevo
    });

  } catch (error) {
    console.error("Error en createPasajeroViaje:", error);
    res.status(500).json({ msg: "Error al registrar pasajero en viaje" });
  }
};

// Actualizar un pasajero en un viaje
export const updatePasajeroViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero_asiento, estado } = req.body;

    const pasajero = await PasajerosViaje.findByPk(id);
    if (!pasajero) return res.status(404).json({ msg: "Registro no encontrado" });

    pasajero.numero_asiento = numero_asiento || pasajero.numero_asiento;
    pasajero.estado = estado || pasajero.estado;

    await pasajero.save();
    res.status(200).json(pasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar pasajero en viaje" });
  }
};

// Eliminar un pasajero de un viaje
export const deletePasajeroViaje = async (req, res) => {
  try {
    const { id } = req.params;

    const pasajero = await PasajerosViaje.findByPk(id);
    if (!pasajero) return res.status(404).json({ msg: "Registro no encontrado" });

    await pasajero.destroy();
    res.status(200).json({ msg: "Pasajero eliminado del viaje" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar pasajero del viaje" });
  }
};
