import Vehiculos from "../models/vehiculos.js";

// Obtener todos los vehículos
export const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculos.findAll();
    res.status(200).json(vehiculos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los vehículos" });
  }
};
export const getVehiculoById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const vehiculo = await Vehiculos.findByPk(id, {
      include: [
        {
          association: 'conductor',
          include: ['usuario']
        }
      ]
    });

    if (!vehiculo) {
      return res.status(404).json({ msg: "Vehículo no encontrado" });
    }

    res.status(200).json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el vehículo" });
  }
};
// Crear un nuevo vehículo
export const createVehiculo = async (req, res) => {
  try {
    const {
      placa,
      marca,
      modelo,
      anio,
      capacidad_pasajeros,
      id_conductor,
      estado
    } = req.body;

    // Validar formato de placa
    const placaRegex = /^[0-9]{4}[A-Z]{3}$/i;
    if (!placaRegex.test(placa)) {
      return res.status(400).json({
        msg: "La placa debe tener el formato: 4 números seguidos de 3 letras (ej. 1234ABC)"
      });
    }
    
    //validar ano de vehiculo
    const anioActual = new Date().getFullYear();
    const anioMinimo = anioActual - 80; 

    if (anio < anioMinimo || anio > anioActual) {
      return res.status(400).json({
        msg: `El año del vehículo debe estar entre ${anioMinimo} y ${anioActual}`
      });
    }

    const newVehiculo = await Vehiculos.create({
      placa,
      marca,
      modelo,
      anio,
      capacidad_pasajeros,
      id_conductor,
      estado
    });

    res.status(201).json(newVehiculo);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el vehículo" });
  }
};

// Editar un vehículo
export const updateVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      placa,
      marca,
      modelo,
      anio,
      capacidad_pasajeros,
      id_conductor,
      estado
    } = req.body;

    const vehiculo = await Vehiculos.findByPk(id);

    if (!vehiculo) return res.status(404).json({ msg: "Vehículo no encontrado" });

    vehiculo.placa = placa || vehiculo.placa;
    vehiculo.marca = marca || vehiculo.marca;
    vehiculo.modelo = modelo || vehiculo.modelo;
    vehiculo.anio = anio || vehiculo.anio;
    vehiculo.capacidad_pasajeros = capacidad_pasajeros || vehiculo.capacidad_pasajeros;
    vehiculo.id_conductor = id_conductor || vehiculo.id_conductor;
    vehiculo.estado = estado || vehiculo.estado;

    await vehiculo.save();

    res.status(200).json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el vehículo" });
  }
};

// Eliminar un vehículo
export const deleteVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculo = await Vehiculos.findByPk(id);
    if (!vehiculo) return res.status(404).json({ msg: "Vehículo no encontrado" });

    await vehiculo.destroy();

    res.status(200).json({ msg: "Vehículo eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el vehículo" });
  }
};
