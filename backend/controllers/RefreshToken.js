import Users from "../models/usuarios.js";
import Roles from "../models/roles.js"; // ✅ 1. IMPORTAR
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    // ✅ 2. AGREGAR INCLUDE PARA TRAER EL ROL
    const user = await Users.findOne({
      where: { refresh_token: refreshToken },
      include: [{
        model: Roles,
        as: 'rol',
        attributes: ['id_rol', 'nombre_rol', 'descripcion']
      }]
    });

    if (!user) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);

      // ✅ 3. DESTRUCTURAR CORRECTAMENTE
      const { 
        id_usuario, 
        nombre_completo, 
        apellido_paterno, 
        apellido_materno, 
        email, 
        foto_perfil,
        is2FAEnabled 
      } = user;

      // ✅ 4. ACCEDER AL ROL CORRECTAMENTE
      const accessToken = jwt.sign(
        { 
          id_usuario, 
          nombre_completo, 
          apellido_paterno, 
          apellido_materno, 
          email, 
          foto_perfil, 
          is2FAEnabled,
          rol: {                              // ✅ AHORA SÍ EXISTE
            id_rol: user.rol.id_rol,          // ✅ user.rol viene del INCLUDE
            nombre_rol: user.rol.nombre_rol,
            descripcion: user.rol.descripcion
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error refreshing token" });
  }
};