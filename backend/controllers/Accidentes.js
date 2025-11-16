import accidentes from "../models/accidentes.js";

// Obtener todos los accidentes
export const getAccidentes = async (req, res) => {
  try {
    const data = await accidentes.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Crear un nuevo accidente
export const createAccidente = async (req, res) => {
  const { id_viaje, descripcion, heridos, fallecidos, fecha } = req.body;
  try {
    const newAccidente = await accidentes.create({
      id_viaje,
      descripcion,
      heridos,
      fallecidos,
      fecha,
    });
    res.status(201).json(newAccidente);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Actualizar un accidente existente
export const updateAccidente = async (req, res) => {
  const { id } = req.params;
  const { descripcion, heridos, fallecidos, fecha } = req.body;
  try {
    const accident = await accidentes.findByPk(id);
    if (!accident)
      return res.status(404).json({ msg: "Accidente no encontrado" });

    await accidentes.update(
      { descripcion, heridos, fallecidos, fecha },
      { where: { id_accidente: id } }
    );

    res.status(200).json({ msg: "Accidente actualizado" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Eliminar un accidente
export const deleteAccidente = async (req, res) => {
  const { id } = req.params;
  try {
    const accident = await accidentes.findByPk(id);
    if (!accident)
      return res.status(404).json({ msg: "Accidente no encontrado" });

    await accidentes.destroy({ where: { id_accidente: id } });
    res.status(200).json({ msg: "Accidente eliminado" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
