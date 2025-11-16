import { Sequelize } from "sequelize";

const db = new Sequelize('sindicatoregional', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;