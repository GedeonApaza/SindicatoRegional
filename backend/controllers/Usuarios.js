import Users from "../models/usuarios.js";
import Roles from "../models/roles.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticator } from "otplib";
import qrcode from "qrcode";

// INICIALIZACIÓN DEL SISTEMA: VERIFICA SI EXISTEN USUARIOS
export const inicializacionUser = async (req, res) => {
  try {
    // Contar usuarios en la tabla
    const totalUsuarios = await Users.count();

    if (totalUsuarios === 0) {
      return res.status(200).json({
        inicializado: false,
        msg: "No hay usuarios en el sistema. Se requiere configuración inicial."
      });
    }

    return res.status(200).json({
      inicializado: true,
      msg: "El sistema ya está inicializado.",
      totalUsuarios
    });

  } catch (error) {
    console.error("Error al verificar inicialización:", error);
    res.status(500).json({ msg: "Error al verificar inicialización del sistema" });
  }
};
export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await Users.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    user.estado = 'activo';
    await user.save();
    
    res.status(200).json({ 
      msg: "Usuario activado correctamente",
      user 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al activar usuario" });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buscar el usuario
    const user = await Users.findByPk(id, {
      attributes: [
        'id_usuario',
        'ci',
        'nombre_completo',
        'apellido_paterno',
        'apellido_materno',
        'email',
        'id_rol',
        'estado',
        'foto_perfil',
        'fecha_creacion'
      ]
    });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    // Buscar el rol por id_rol
    const rol = await Roles.findByPk(user.id_rol, {
      attributes: ['nombre_rol']
    });

    // Combinar la respuesta
    const response = {
      ...user.toJSON(),
      nombre_rol: rol ? rol.nombre_rol : null
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener usuario" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id_usuario','ci','nombre_completo','apellido_paterno','apellido_materno','email','id_rol','estado']
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error retrieving users" });
  }
};

// REGISTRO DE USUARIO CON FOTO
export const Register = async (req, res) => {
  const { ci, nombre_completo, apellido_paterno, apellido_materno, email, password, confPassword, id_rol, estado } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password and Confirm Password do not match" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    let foto_perfil = null;
    if (req.file) {
      foto_perfil = '/uploads/imagen_perfil/' + req.file.filename;
    }

    await Users.create({
      ci,
      nombre_completo,
      apellido_paterno,
      apellido_materno,
      email,
      password: hashPassword,
      id_rol,
      estado: estado || "activo",
      fecha_creacion: new Date(),
      foto_perfil
    });

    res.status(201).json({ msg: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear usuario" });
  }
};
//modificar
// ACTUALIZAR USUARIO
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { ci, nombre_completo, apellido_paterno, apellido_materno, email, id_rol, estado } = req.body;

    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    let foto_perfil = user.foto_perfil;
    if (req.file) {
      foto_perfil = '/uploads/imagen_perfil/' + req.file.filename;
    }

    await Users.update(
      {
        ci,
        nombre_completo,
        apellido_paterno,
        apellido_materno,
        email,
        id_rol,
        estado,
        foto_perfil,
        fecha_modificacion: new Date()
      },
      { where: { id_usuario: id } }
    );

    res.status(200).json({ msg: "Usuario actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
};
//eliminar
// DESACTIVAR USUARIO (NO SE BORRA, SOLO CAMBIA ESTADO)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    await Users.update(
      {
        estado: "inactivo",
        fecha_eliminacion: new Date()
      },
      { where: { id_usuario: id } }
    );

    res.status(200).json({ msg: "Usuario desactivado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al desactivar usuario" });
  }
};

// DOBLE FACTOR INICIALIZACIÓN
export const setup2FA = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    // Generar secreto solo si no existe
    let secret = user.secret_2fa;
    if (!secret) {
      secret = authenticator.generateSecret();
      await Users.update(
        { secret_2fa: secret, is2FAEnabled: false }, // aún no se activa
        { where: { email } }
      );
    }

    const otpauth = authenticator.keyuri(
      user.email,
      "Sindicato Regional de Transporte Eco Tours",
      secret
    );
    const qr = await qrcode.toDataURL(otpauth);

    res.json({
      msg: "Escanea este QR con Google/Microsoft Authenticator",
      qr,
      secret
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error configurando 2FA" });
  }
};


// LOGIN
export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ msg: "Email no encontrado" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Contraseña incorrecta" });

    // Si tiene 2FA habilitado, no generamos token aún
    if (user.is2FAEnabled) {
      return res.status(206).json({
        msg: "Se requiere código 2FA"
      });
    }

    // Normal login (sin 2FA)
    const accessToken = jwt.sign(
      { id_usuario: user.id_usuario, nombre_completo:user.nombre_completo,apellido_paterno:user.apellido_paterno, apellido_materno: user.apellido_materno , email: user.email, rol: user.id_rol,foto_perfil:user.foto_perfil },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id_usuario: user.id_usuario, email: user.email, rol: user.id_rol },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update({ refresh_token: refreshToken }, { where: { id_usuario: user.id_usuario } });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Login error" });
  }
};

// VERIFICACION DEL DOBLE FACTOR
export const verify2FA = async (req, res) => {
  const { email, token } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const isValid = authenticator.verify({
      token,
      secret: user.secret_2fa
    });

    if (!isValid) return res.status(400).json({ msg: "Código inválido" });

    // Generamos los tokens después de verificar 2FA
    const accessToken = jwt.sign(
      { id_usuario: user.id_usuario, email: user.email, rol: user.id_rol },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id_usuario: user.id_usuario, email: user.email, rol: user.id_rol },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update({ refresh_token: refreshToken }, { where: { id_usuario: user.id_usuario } });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ msg: "2FA verificado", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error verificando 2FA" });
  }
};

export const toggle2FA = async (req, res) => {
  try {
    const { email, enable } = req.body; // enable = true/false

    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    if (enable) {
      await Users.update(
        { is2FAEnabled: true },
        { where: { email } }
      );

      return res.json({
        msg: "2FA activado",
      });
    } else {
      // Desactivar 2FA: borrar secreto
      await Users.update(
        { is2FAEnabled: false, secret_2fa: null },
        { where: { email } }
      );

      return res.json({ msg: "2FA desactivado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar 2FA" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await Users.findOne({ where: { refresh_token: refreshToken } });
  if (!user) return res.sendStatus(204);

  await Users.update({ refresh_token: null }, { where: { id_usuario: user.id_usuario } });
  res.clearCookie('refreshToken');
  res.sendStatus(200);
};
