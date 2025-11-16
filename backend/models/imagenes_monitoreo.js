import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const imagenes_monitoreo = db.define('imagenes_monitoreo',{
    id_imagen: {
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
    },
    ruta_imagen: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    procesada: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  },{
    freezeTableName: true
});


export default imagenes_monitoreo;