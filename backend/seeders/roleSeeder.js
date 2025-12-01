// seeders/roleSeeder.js
import roles from "../models/roles.js";

export const seedRoles = async () => {
  try {
    const count = await roles.count(); 
    if (count > 0) {
      console.log("Roles ya existen. Seeder omitido.");
      return;
    }

    await roles.bulkCreate([
      {
        nombre_rol: "administrador",
        descripcion: "Control total del sistema"
      },
      {
        nombre_rol: "conductor",
        descripcion: "Usuario conductor del sindicato"
      }
    ]);

    console.log("Roles creados correctamente (administrador, conductor)");
  } catch (error) {
    console.error("Error al ejecutar seeder de roles:", error);
  }
};
// Ejecutar el seeder
seedRoles();
