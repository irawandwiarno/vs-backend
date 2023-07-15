import { Sequelize } from "sequelize";

const db = new Sequelize("vintage_series", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
