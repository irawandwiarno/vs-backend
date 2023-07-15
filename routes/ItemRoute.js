import express from "express";
import {
  getItems,
  getItemById,
  updateItem,
} from "../controller/ItemsController.js";
import { createNota, getNotas } from "../controller/NotaController.js";

const router = express.Router();

router.get("/items", getItems);
router.get("/items/:id", getItemById);
router.patch("/items/:id", updateItem);
router.get("/nota/:date", getNotas);
router.post("/nota", createNota);

export default router;
