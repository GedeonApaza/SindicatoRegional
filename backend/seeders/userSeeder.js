// seeders/userSeeder.js
import Users from "../models/usuarios.js";
import bcrypt from "bcrypt";

export const seedUser = async () => {
  try {

    // Verificar si ya existe el correo
    const existe = await Users.findOne({ where: { email: "admin@gmail.com" } });

    if (existe) {
      console.log("Usuario 'admin@gmail' ya existe. Seeder omitido.");
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash("12345678", salt);

    await Users.create({
      ci: "12345678",
      nombre_completo: "Gedeon Nataniel",
      apellido_paterno: "Choque",
      apellido_materno: "Apaza",
      email: "admin@gmail.com",
      password: hashPassword,
      id_rol: 1,
      estado: "activo",
      fecha_creacion: new Date(),
      foto_perfil: null
    });

    console.log("Usuario administrador creado: admin@gmail / 12345678");

  } catch (error) {
    console.error("Error al ejecutar userSeeder:", error);
  }
};

// Ejecutar
seedUser();
