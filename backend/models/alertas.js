import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const alertas = db.define('alertas',{
    id_alerta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_viaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'viajes',
        key: 'id_viaje'
      }
    },
    tipo: {
      type: DataTypes.ENUM('retraso','emergencia','accidente'),
      allowNull: false
    },
    mensaje: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    estado: {
      type: DataTypes.ENUM('activa','resuelta'),
      allowNull: true,
      defaultValue: "activa"
    }
  },{
    freezeTableName: true
});


export default alertas;