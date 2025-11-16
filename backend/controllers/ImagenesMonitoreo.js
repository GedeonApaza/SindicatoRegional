import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ImagenesMonitoreo from "../models/imagenes_monitoreo.js";

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Obtener todas las imágenes
export const getImagenes = async (req, res) => {
  try {
    const imagenes = await ImagenesMonitoreo.findAll();
    res.status(200).json(imagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las imágenes de monitoreo" });
  }
};

// Obtener imágenes por id_viaje
export const getImagenesByViaje = async (req, res) => {
  try {
    const { id_viaje } = req.params;
    const imagenes = await ImagenesMonitoreo.findAll({
      where: { id_viaje }
    });

    if (!imagenes || imagenes.length === 0) {
      return res.status(404).json({ msg: "No se encontraron imágenes para este viaje" });
    }

    res.status(200).json(imagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener imágenes por viaje" });
  }
};

// Crear nueva imagen
// Crear nueva imagen desde archivo
export const createImagen = async (req, res) => {
  try {
    const { id_viaje, fecha_hora, procesada } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "No se subió ninguna imagen" });
    }

    // Ruta relativa que se guardará en la base de datos
    const ruta_imagen = '/uploads/imagenes_monitoreo/' + req.file.filename;

    const nuevaImagen = await ImagenesMonitoreo.create({
      id_viaje,
      fecha_hora: fecha_hora || new Date(),
      ruta_imagen,
      procesada: procesada || false
    });

    res.status(201).json(nuevaImagen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al guardar la imagen" });
  }
};


// Actualizar imagen
export const updateImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_viaje, fecha_hora, procesada } = req.body;

    const imagen = await ImagenesMonitoreo.findByPk(id);
    if (!imagen) return res.status(404).json({ msg: "Imagen no encontrada" });

    // Si se subió un nuevo archivo, eliminar el anterior y actualizar la ruta
    if (req.file) {
      const rutaAnterior = path.join(__dirname, '..', imagen.ruta_imagen);
      if (fs.existsSync(rutaAnterior)) {
        fs.unlinkSync(rutaAnterior); // elimina el archivo viejo
      }
      imagen.ruta_imagen = '/uploads/imagenes_monitoreo/' + req.file.filename;
    }

    imagen.id_viaje = id_viaje || imagen.id_viaje;
    imagen.fecha_hora = fecha_hora || imagen.fecha_hora;
    imagen.procesada = procesada !== undefined ? procesada : imagen.procesada;

    await imagen.save();
    res.status(200).json(imagen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar la imagen" });
  }
};


// Eliminar imagen
export const deleteImagen = async (req, res) => {
  try {
    const { id } = req.params;

    const imagen = await ImagenesMonitoreo.findByPk(id);
    if (!imagen) return res.status(404).json({ msg: "Imagen no encontrada" });

    await imagen.destroy();
    res.status(200).json({ msg: "Imagen eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar la imagen" });
  }
};
