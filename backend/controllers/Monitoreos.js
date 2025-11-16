import Monitoreos from "../models/monitoreos.js";

// Obtener todos los registros de monitoreo
export const getMonitoreos = async (req, res) => {
  try {
    const monitoreos = await Monitoreos.findAll();
    res.status(200).json(monitoreos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los registros de monitoreo" });
  }
};

// Obtener monitoreos por viaje
export const getMonitoreosByViaje = async (req, res) => {
  try {
    const { id_viaje } = req.params;
    const monitoreos = await Monitoreos.findAll({ where: { id_viaje } });
    if (!monitoreos.length)
      return res.status(404).json({ msg: "No se encontraron registros para este viaje" });

    res.status(200).json(monitoreos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los registros del viaje" });
  }
};

// Crear un nuevo registro de monitoreo
export const createMonitoreo = async (req, res) => {
  try {
    const { id_viaje, fecha_hora, latitud, longitud, velocidad } = req.body;

    const newMonitoreo = await Monitoreos.create({
      id_viaje,
      fecha_hora,
      latitud,
      longitud,
      velocidad,
    });

    res.status(201).json(newMonitoreo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el registro de monitoreo" });
  }
};

// Actualizar un registro de monitoreo
export const updateMonitoreo = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_viaje, fecha_hora, latitud, longitud, velocidad } = req.body;

    const monitoreo = await Monitoreos.findByPk(id);
    if (!monitoreo) return res.status(404).json({ msg: "Registro no encontrado" });

    monitoreo.id_viaje = id_viaje || monitoreo.id_viaje;
    monitoreo.fecha_hora = fecha_hora || monitoreo.fecha_hora;
    monitoreo.latitud = latitud || monitoreo.latitud;
    monitoreo.longitud = longitud || monitoreo.longitud;
    monitoreo.velocidad = velocidad || monitoreo.velocidad;

    await monitoreo.save();

    res.status(200).json(monitoreo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el registro de monitoreo" });
  }
};

// Eliminar un registro de monitoreo
export const deleteMonitoreo = async (req, res) => {
  try {
    const { id } = req.params;

    const monitoreo = await Monitoreos.findByPk(id);
    if (!monitoreo) return res.status(404).json({ msg: "Registro no encontrado" });

    await monitoreo.destroy();

    res.status(200).json({ msg: "Registro de monitoreo eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el registro de monitoreo" });
  }
};
