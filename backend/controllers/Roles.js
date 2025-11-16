import Roles from "../models/roles.js";

// Obtener todos los roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener roles" });
  }
};

// Crear un nuevo rol
export const createRole = async (req, res) => {
  try {
    const { nombre_rol, descripcion } = req.body;

    const newRole = await Roles.create({
      nombre_rol,
      descripcion
    });

    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el rol" });
  }
};

// Editar un rol
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_rol, descripcion } = req.body;

    const role = await Roles.findByPk(id);

    if (!role) return res.status(404).json({ msg: "Rol no encontrado" });

    role.nombre_rol = nombre_rol || role.nombre_rol;
    role.descripcion = descripcion || role.descripcion;

    await role.save();

    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el rol" });
  }
};

// Eliminar un rol
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Roles.findByPk(id);
    if (!role) return res.status(404).json({ msg: "Rol no encontrado" });

    await role.destroy();

    res.status(200).json({ msg: "Rol eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el rol" });
  }
};
