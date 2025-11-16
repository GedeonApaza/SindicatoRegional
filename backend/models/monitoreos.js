import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const monitoreos = db.define('monitoreos',{
    id_monitoreo: {
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
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    latitud: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false
    },
    longitud: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false
    },
    velocidad: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: true
    }
  },{
    freezeTableName: true
});


export default monitoreos;