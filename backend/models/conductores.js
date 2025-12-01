import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const conductores = db.define('conductores',{
    id_conductor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    licencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_vencimiento_licencia: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    celular: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contacto_emergencia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  },{
    freezeTableName: true
});

export default conductores;