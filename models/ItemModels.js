import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Item = db.define('items', {
    name: DataTypes.STRING,
    noPart: DataTypes.STRING,
    model: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stok: DataTypes.DOUBLE
    
}, {
    freezeTableNames: true
});

export default Item;

(async () => {
    await db.sync();
})();