import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const accidentes = db.define('accidentes',{
    id_accidente: {
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
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    heridos: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    fallecidos: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },{
    freezeTableName: true
});

export default accidentes;