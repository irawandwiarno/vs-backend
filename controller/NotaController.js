import Nota from "../models/NotaPembelianModels.js";
import { Op } from "sequelize";

export const getNotas = async () => {
  try {
    const response = await Item.findAll();
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

export const createNota = async (req, res) => {
  try {
    const newItem = req.body.item; // Access the item property from the request body
    const catatan = req.body.catatan; // Access the catatan property from the request body

    const nota = await Nota.create({ Item: newItem, catatan });

    res.status(200).json({ result: nota });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create nota" });
  }
};
