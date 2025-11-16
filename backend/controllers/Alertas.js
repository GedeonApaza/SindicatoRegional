import alertas from "../models/alertas.js";

export const getAlertas = async (req, res) => {
  try {
    const result = await alertas.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAlerta = async (req, res) => {
  try {
    const { id_viaje, tipo, mensaje, estado } = req.body;
    const result = await alertas.create({ id_viaje, tipo, mensaje, estado });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, mensaje, estado } = req.body;
    const result = await alertas.update(
      { tipo, mensaje, estado },
      { where: { id_alerta: id } }
    );
    if(result[0] === 0) return res.status(404).json({ msg: "Alerta no encontrada" });
    res.status(200).json({ msg: "Alerta actualizada" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await alertas.destroy({ where: { id_alerta: id } });
    if(!result) return res.status(404).json({ msg: "Alerta no encontrada" });
    res.status(200).json({ msg: "Alerta eliminada" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
