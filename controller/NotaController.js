import Nota from "../models/NotaPembelianModels.js";
import { Op } from "sequelize";

export const getNotas = async (req, res) => {
  const date = req.query.date;
  // console.log(parseInt(date.year));
  const year = parseInt(date.year);
  const month = parseInt(date.month);
  const day = parseInt(date.day);

  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const offset = limit * page;

  let whereCondition = {};

  if (day == 0) {
    const startDate = new Date(year, month - 1, 1, 0, 0, 0);
    const endDate = new Date(year, month - 1, 31, 23, 59, 59);
    whereCondition = {
      createdAt: {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      },
    };
  } else {
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59);

    whereCondition = {
      createdAt: {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      },
    };
  }

  const totalRows = await Nota.count({
    where: whereCondition,
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Nota.findAll({
    where: whereCondition,
    offset: offset,
    limit: limit,
    order: [["id", "ASC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

export const getNotaByDate = async (req, res) => {
  try {
    const year = parseInt(req.body.year);
    const month = parseInt(req.body.month);
    const day = parseInt(req.body.day);

    let whereCondition = {};

    if (day == 0) {
      const startDate = new Date(year, month - 1, 1, 0, 0, 0);
      const endDate = new Date(year, month - 1, 31, 23, 59, 59);

      whereCondition = {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      };
    } else {
      const startDate = new Date(year, month - 1, day, 0, 0, 0);
      const endDate = new Date(year, month - 1, day, 23, 59, 59);

      whereCondition = {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      };
    }

    const data = await Nota.findAll({
      where: whereCondition,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNota = async (req, res) => {
  try {
    const newItem = req.body.item; // Access the item property from the request body
    const catatan = req.body.catatan; // Access the catatan property from the request body
    const total = req.body.total; // Access the catatan property from the request body

    const nota = await Nota.create({ Item: newItem, catatan, total : total });

    res.status(200).json({ result: nota });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create nota" });
  }
};

export const deleteNota = async (req, res) => {
  const { id } = req.params; // Ambil id dari parameter

  try {
    // Cari nota berdasarkan id
    const nota = await Nota.findOne({ where: { id } });

    if (!nota) {
      return res.status(404).json({ message: "Nota tidak ditemukan" });
    }

    // Hapus nota
    await nota.destroy();

    return res.status(200).json({ message: "Nota berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus nota" });
  }
};
