import Users from "../models/usuarios.js";
import Conductores from "../models/conductores.js";

import bcrypt from "bcrypt";
export const registerConductor = async (req, res) => {
  const {
    ci,
    nombre_completo,
    apellido_paterno,
    apellido_materno,
    email,
    password,
    confPassword,
    id_rol,
    licencia,
    fecha_vencimiento_licencia,
    celular,
    contacto_emergencia,
    fecha_ingreso
  } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password y Confirm Password no coinciden" });
  }

  try {
    // Validar duplicados por CI
    const existingUserByCi = await Users.findOne({ where: { ci } });
    if (existingUserByCi) {
      return res.status(400).json({ msg: "Ya existe un usuario con esta CI" });
    }

    // Validar duplicados por Email
    const existingUserByEmail = await Users.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ msg: "Ya existe un usuario con este Email" });
    }

    // Validar duplicados por Licencia
    const existingConductorByLicencia = await Conductores.findOne({ where: { licencia } });
    if (existingConductorByLicencia) {
      return res.status(400).json({ msg: "Ya existe un conductor con esta Licencia, verifique la suya" });
    }

    // Crear usuario
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      ci,
      nombre_completo,
      apellido_paterno,
      apellido_materno,
      email,
      password: hashPassword,
      id_rol,
      estado: "activo",
      fecha_creacion: new Date(),
    });

    // Crear conductor asociado
    const newConductor = await Conductores.create({
      id_usuario: newUser.id_usuario,
      licencia,
      fecha_vencimiento_licencia,
      celular,
      contacto_emergencia,
      fecha_ingreso,
    });

    res.status(201).json({ 
      msg: "Conductor registrado exitosamente", 
      usuario: newUser, 
      conductor: newConductor 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al registrar conductor" });
  }
};


// Obtener todos los conductores (GET)
export const getConductores = async (req, res) => {
  try {
    const conductores = await Conductores.findAll({
      attributes: ['id_conductor','id_usuario','licencia','fecha_vencimiento_licencia','celular','contacto_emergencia','fecha_ingreso']
    });

    const resultado = await Promise.all(
      conductores.map(async (conductor) => {
        const idUsuario = conductor.id_usuario; // o conductor.get('id_usuario')
        if (!idUsuario) return { conductor, usuario: null };

        const usuario = await Users.findOne({
          where: { id_usuario: idUsuario },
          attributes: ['ci','nombre_completo','apellido_paterno','apellido_materno','email','id_rol','estado']
        });
        return { conductor, usuario };
      })
    );

    res.status(200).json(resultado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener conductores" });
  }
};
// Obtener un conductor por ID (GET)
export const getConductorById = async (req, res) => {
  const { id } = req.params;

  try {
    const conductor = await Conductores.findByPk(id, {
      attributes: [
        'id_conductor',
        'id_usuario',
        'licencia',
        'fecha_vencimiento_licencia',
        'celular',
        'contacto_emergencia',
        'fecha_ingreso'
      ]
    });

    if (!conductor) {
      return res.status(404).json({ msg: "Conductor no encontrado" });
    }

    const usuario = await Users.findOne({
      where: { id_usuario: conductor.id_usuario },
      attributes: [
        'id_usuario',
        'ci',
        'nombre_completo',
        'apellido_paterno',
        'apellido_materno',
        'email',
        'id_rol',
        'estado'
      ]
    });

    res.status(200).json({
      conductor,
      usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener conductor" });
  }
};

// Actualizar conductor (PUT)
// Actualizar conductor (PUT) – similar a registerConductor
export const updateConductor = async (req, res) => {
  const { id } = req.params;
  const {
    ci,
    nombre_completo,
    apellido_paterno,
    apellido_materno,
    email,
    id_rol,
    estado,
    licencia,
    fecha_vencimiento_licencia,
    celular,
    contacto_emergencia,
    fecha_ingreso
  } = req.body;

  try {
    // 1️⃣ Buscar conductor
    const conductor = await Conductores.findByPk(id);
    if (!conductor) return res.status(404).json({ msg: "Conductor no encontrado" });

    // 2️⃣ Validar duplicados (opcional, si cambió CI, email o licencia)
    if (ci) {
      const existingUserByCi = await Users.findOne({ where: { ci, id_usuario: { $ne: conductor.id_usuario } } });
      if (existingUserByCi) return res.status(400).json({ msg: "Ya existe un usuario con esta CI" });
    }
    if (email) {
      const existingUserByEmail = await Users.findOne({ where: { email, id_usuario: { $ne: conductor.id_usuario } } });
      if (existingUserByEmail) return res.status(400).json({ msg: "Ya existe un usuario con este Email" });
    }
    if (licencia) {
      const existingConductorByLicencia = await Conductores.findOne({ where: { licencia, id_conductor: { $ne: conductor.id_conductor } } });
      if (existingConductorByLicencia) return res.status(400).json({ msg: "Ya existe un conductor con esta Licencia" });
    }

    // 3️⃣ Actualizar conductor
    await conductor.update({
      licencia,
      fecha_vencimiento_licencia,
      celular,
      contacto_emergencia,
      fecha_ingreso
    });

    // 4️⃣ Actualizar usuario asociado
    const usuario = await Users.findByPk(conductor.id_usuario);
    if (usuario) {
      await usuario.update({
        ci,
        nombre_completo,
        apellido_paterno,
        apellido_materno,
        email,
        id_rol,
        estado
      });
    }

    // 5️⃣ Devolver ambos objetos actualizados
    res.status(200).json({
      msg: "Conductor actualizado exitosamente",
      conductor,
      usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar conductor" });
  }
};


// Eliminar conductor (DELETE)
export const deleteConductor = async (req, res) => {
  const { id } = req.params;
  try {
    const conductor = await Conductores.findByPk(id);
    if (!conductor) return res.status(404).json({ msg: "Conductor no encontrado" });

    await conductor.destroy();
    res.status(200).json({ msg: "Conductor eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar conductor" });
  }
};