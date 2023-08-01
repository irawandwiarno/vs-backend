import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Nota = db.define(
  "Nota_Pembelian",
  {
    Item: DataTypes.JSON,
    catatan: DataTypes.TEXT,
    total: DataTypes.DOUBLE,
  },
  {
    freezeTableNames: true,
  }
);

export default Nota;

(async () => {
  await db.sync();
})();
