import Viajes from "../models/viajes.js";

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

    const newViaje = await Viajes.create({
      id_vehiculo,
      fecha_inicio,
      fecha_fin,
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
