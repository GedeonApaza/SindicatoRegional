import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const pasajeros_viaje = db.define('pasajeros_viaje',{
    id_pasajero_viaje: {
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
    id_pasajero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pasajeros',
        key: 'id_pasajero'
      }
    },
    numero_asiento: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('registrado','no registrado','descendio'),
      allowNull: true,
      defaultValue: "registrado"
    }
  },{
    freezeTableName: true,
});


export default pasajeros_viaje;