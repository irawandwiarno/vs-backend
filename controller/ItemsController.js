import Item from "../models/ItemModels.js";
import { Op } from "sequelize";

export const getItems = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search;
  const offset = limit * page;
  const totalRows = await Item.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          noPart: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Item.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          noPart: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
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

export const getItemById = async (req, res) => {
  try {
    const response = await Item.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

export const createItem = async (req, res) => {
  try {
    await Item.create(req.body);
    res.status(201).json({ msg: "Item created successfully" });
  } catch (e) {
    console.log(e);
  }
};

export const updateItem = async (req, res) => {
  try {
    await Item.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Item updated successfully" });
  } catch (e) {
    console.log(e.message);
  }
};
