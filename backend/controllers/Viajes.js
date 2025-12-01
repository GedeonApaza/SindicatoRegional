import Viajes from "../models/viajes.js";
import { Op } from 'sequelize';
// Obtener todos los viajes
export const getViajes = async (req, res) => {
  try {
    const viajes = await Viajes.findAll();
    res.status(200).json(viajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los viajes" });
  }
};

// Crear un nuevo viaje
export const createViaje = async (req, res) => {
  try {
    const { id_vehiculo, fecha_inicio, fecha_fin, origen, destino, estado } = req.body;

    // Convertir las fechas a objetos Date
    const fechaInicio = new Date(fecha_inicio);
    const fechaFin = new Date(fecha_fin);
    const hoy = new Date();

    // Validación 1: Ambas fechas deben ser del día actual
    const esHoy = (fecha) => {
      return fecha.getDate() === hoy.getDate() &&
             fecha.getMonth() === hoy.getMonth() &&
             fecha.getFullYear() === hoy.getFullYear();
    };

    if (!esHoy(fechaInicio) || !esHoy(fechaFin)) {
      return res.status(400).json({ 
        msg: "Las fechas de inicio y fin deben ser del día actual" 
      });
    }

    // Validación 2: La hora de fin debe ser DESPUÉS de la hora de inicio (no igual)
    if (fechaFin <= fechaInicio) {
      return res.status(400).json({ 
        msg: "La hora de fin debe ser posterior a la hora de inicio" 
      });
    }

    // Extraer solo la hora de salida de fecha_inicio
    const horaSalida = fechaInicio.toTimeString().split(' ')[0]; // "16:23:00"

    // Validación 3: No puede haber dos viajes con la misma hora de inicio
    const viajeConMismaHora = await Viajes.findOne({
      where: {
        id_vehiculo,
        fecha_inicio
      }
    });

    if (viajeConMismaHora) {
      return res.status(400).json({ 
        msg: "Ya existe un viaje con esta misma hora de inicio para este vehículo" 
      });
    }

    // Validación 4: La hora de inicio debe ser posterior a todos los viajes anteriores del día
    const inicioDelDia = new Date(fechaInicio);
    inicioDelDia.setHours(0, 0, 0, 0);
    
    const viajesAnteriores = await Viajes.findAll({
      where: {
        id_vehiculo,
        fecha_inicio: {
          [Op.gte]: inicioDelDia,
          [Op.lt]: fechaInicio
        }
      },
      order: [['fecha_inicio', 'DESC']],
      limit: 1
    });

    if (viajesAnteriores.length > 0) {
      const ultimoViaje = viajesAnteriores[0];
      const horaUltimoViaje = new Date(ultimoViaje.fecha_inicio);

      if (fechaInicio <= horaUltimoViaje) {
        return res.status(400).json({ 
          msg: `La hora de inicio debe ser posterior a ${horaUltimoViaje.toLocaleTimeString('es-BO')}` 
        });
      }
    }

    // Si todas las validaciones pasan, crear el viaje
    const newViaje = await Viajes.create({
      id_vehiculo,
      fecha_inicio,
      fecha_fin,
      hora_salida: horaSalida,  
      origen,
      destino,
      estado
    });

    res.status(201).json(newViaje);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el viaje" });
  }
};
// Actualizar un viaje
export const updateViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, estado } = req.body;

    const viaje = await Viajes.findByPk(id);

    if (!viaje) return res.status(404).json({ msg: "Viaje no encontrado" });

    viaje.id_vehiculo = id_vehiculo || viaje.id_vehiculo;
    viaje.id_conductor = id_conductor || viaje.id_conductor;
    viaje.fecha_inicio = fecha_inicio || viaje.fecha_inicio;
    viaje.fecha_fin = fecha_fin || viaje.fecha_fin;
    viaje.origen = origen || viaje.origen;
    viaje.destino = destino || viaje.destino;
    viaje.estado = estado || viaje.estado;

    await viaje.save();

    res.status(200).json(viaje);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el viaje" });
  }
};

// Eliminar un viaje
export const deleteViaje = async (req, res) => {
  try {
    const { id } = req.params;

    const viaje = await Viajes.findByPk(id);
    if (!viaje) return res.status(404).json({ msg: "Viaje no encontrado" });

    await viaje.destroy();

    res.status(200).json({ msg: "Viaje eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el viaje" });
  }
};
