import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const pasajeros = db.define('pasajeros',{
    id_pasajero: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ci: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "ci"
    },
    nombre_completo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido_paterno: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    apellido_materno: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  },{
    freezeTableName: true
});


export default pasajeros;