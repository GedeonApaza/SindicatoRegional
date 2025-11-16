import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const vehiculos = db.define('vehiculos',{
    id_vehiculo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    placa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "placa"
    },
    marca: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    modelo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    capacidad_pasajeros: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 6
    },
    id_conductor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'conductores',
        key: 'id_conductor'
      }
    },
    estado: {
      type: DataTypes.ENUM('activo','mantenimiento','inactivo'),
      allowNull: true,
      defaultValue: "activo"
    }
  },{
    freezeTableName: true
});

export default vehiculos;
