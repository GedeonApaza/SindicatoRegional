import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const roles = db.define('roles',{
    id_rol: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "nombre_rol"
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },{
    freezeTableName: true
});

export default roles;
