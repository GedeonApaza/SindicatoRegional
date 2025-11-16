import Pasajeros from "../models/pasajeros.js";

// Obtener todos los pasajeros
export const getPasajeros = async (req, res) => {
  try {
    const pasajeros = await Pasajeros.findAll();
    res.status(200).json(pasajeros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener pasajeros" });
  }
};
// Obtener un pasajero por ID
export const getPasajeroById = async (req, res) => {
  try {
    const { id } = req.params;

    const pasajero = await Pasajeros.findByPk(id);
    if (!pasajero) return res.status(404).json({ msg: "Pasajero no encontrado" });

    res.status(200).json(pasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el pasajero" });
  }
};

// Crear un nuevo pasajero
export const createPasajero = async (req, res) => {
  try {
    const { ci, nombre_completo, apellido_paterno, apellido_materno } = req.body;

    const newPasajero = await Pasajeros.create({
      ci,
      nombre_completo,
      apellido_paterno,
      apellido_materno
    });

    res.status(201).json(newPasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el pasajero" });
  }
};

// Editar un pasajero
export const updatePasajero = async (req, res) => {
  try {
    const { id } = req.params;
    const { ci, nombre_completo, apellido_paterno, apellido_materno } = req.body;

    const pasajero = await Pasajeros.findByPk(id);
    if (!pasajero) return res.status(404).json({ msg: "Pasajero no encontrado" });

    pasajero.ci = ci || pasajero.ci;
    pasajero.nombre_completo = nombre_completo || pasajero.nombre_completo;
    pasajero.apellido_paterno = apellido_paterno || pasajero.apellido_paterno;
    pasajero.apellido_materno = apellido_materno || pasajero.apellido_materno;

    await pasajero.save();

    res.status(200).json(pasajero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el pasajero" });
  }
};

// Eliminar un pasajero
export const deletePasajero = async (req, res) => {
  try {
    const { id } = req.params;

    const pasajero = await Pasajeros.findByPk(id);
    if (!pasajero) return res.status(404).json({ msg: "Pasajero no encontrado" });

    await pasajero.destroy();

    res.status(200).json({ msg: "Pasajero eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el pasajero" });
  }
};
