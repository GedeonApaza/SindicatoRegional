import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const viajes = db.define('viajes',{
    id_viaje: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vehiculos',
        key: 'id_vehiculo'
      }
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hora_salida: {
      type: DataTypes.TIME,
      allowNull: true
    },
    hora_llegada: {
      type: DataTypes.TIME,
      allowNull: true
    },
    origen: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    destino: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('programado','en_ruta','finalizado','cancelado'),
      allowNull: true,
      defaultValue: "programado"
    }
  },{
    freezeTableName: true
});


export default viajes;
