import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const usuarios = db.define('usuarios',{
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ci: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "ci"
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido_paterno: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido_materno: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    refresh_token:{
    type: DataTypes.TEXT
    },
    foto_perfil: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id_rol'
      }
    },
    estado: {
      type: DataTypes.ENUM('activo','inactivo'),
      allowNull: true,
      defaultValue: "activo"
    },
    secret_2fa: {
    type: DataTypes.STRING,
    allowNull: true
    },
    is2FAEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_modificacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_eliminacion: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },{
    freezeTableName: true
});


export default usuarios;

