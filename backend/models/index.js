import db from "../config/Database.js";

// Modelos base
import Roles from "./roles.js";
import Usuarios from "./usuarios.js";
import Conductores from "./conductores.js";
import Vehiculos from "./vehiculos.js";
import Pasajeros from "./pasajeros.js";
import Viajes from "./viajes.js";

// Modelos dependientes
import PasajerosViaje from "./pasajeros_viaje.js";
import Monitoreos from "./monitoreos.js";
import ImagenesMonitoreo from "./imagenes_monitoreo.js";
import Alertas from "./alertas.js";
import Accidentes from "./accidentes.js";


// --- RELACIONES ---
// Roles - Usuarios
Roles.hasMany(Usuarios, { foreignKey: "id_rol" });
Usuarios.belongsTo(Roles, { foreignKey: "id_rol" });

// Usuarios - Conductores (1:1)
Usuarios.hasOne(Conductores, { foreignKey: "id_usuario" });
Conductores.belongsTo(Usuarios, { foreignKey: "id_usuario" });

// Conductores - Vehiculos (1:N)
Conductores.hasMany(Vehiculos, { foreignKey: "id_conductor" });
Vehiculos.belongsTo(Conductores, { foreignKey: "id_conductor" });

// Viajes - Vehiculos (N:1)
Vehiculos.hasMany(Viajes, { foreignKey: "id_vehiculo" });
Viajes.belongsTo(Vehiculos, { foreignKey: "id_vehiculo" });

// Viajes - Pasajeros (N:M) mediante pasajeros_viaje
Viajes.hasMany(PasajerosViaje, { foreignKey: "id_viaje", as: "pasajeros" });
PasajerosViaje.belongsTo(Viajes, { foreignKey: "id_viaje" });

Pasajeros.hasMany(PasajerosViaje, { foreignKey: "id_pasajero", as: "viajes" });
PasajerosViaje.belongsTo(Pasajeros, { foreignKey: "id_pasajero" });
/*
Viajes.belongsToMany(Pasajeros, { through: PasajerosViaje, foreignKey: "id_viaje" });
Pasajeros.belongsToMany(Viajes, { through: PasajerosViaje, foreignKey: "id_pasajero" });
*/
// Viajes - Monitoreos (1:N)
Viajes.hasMany(Monitoreos, { foreignKey: "id_viaje" });
Monitoreos.belongsTo(Viajes, { foreignKey: "id_viaje" });

// Viajes - ImagenesMonitoreo (1:N)
Viajes.hasMany(ImagenesMonitoreo, { foreignKey: "id_viaje" });
ImagenesMonitoreo.belongsTo(Viajes, { foreignKey: "id_viaje" });

// Viajes - Alertas (1:N)
Viajes.hasMany(Alertas, { foreignKey: "id_viaje" });
Alertas.belongsTo(Viajes, { foreignKey: "id_viaje" });

// Viajes - Accidentes (1:N)
Viajes.hasMany(Accidentes, { foreignKey: "id_viaje" });
Accidentes.belongsTo(Viajes, { foreignKey: "id_viaje" });


// --- SINCRONIZACIÓN ---
(async () => {
  try {
    await db.sync({ alter: true }); // usar { force: true } en desarrollo si necesitas limpiar tablas
    console.log("Todas las tablas y relaciones están sincronizadas");
  } catch (error) {
    console.error("Error al sincronizar tablas:", error);
  }
})();

export {
  Roles,
  Usuarios,
  Conductores,
  Vehiculos,
  Pasajeros,
  Viajes,
  PasajerosViaje,
  Monitoreos,
  ImagenesMonitoreo,
  Alertas,
  Accidentes
};
