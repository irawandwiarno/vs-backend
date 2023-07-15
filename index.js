import express from "express";
import cors from "cors";
import ItemRoutes from "./routes/ItemRoute.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(ItemRoutes);

app.listen("5000", () => console.log("server is running..."));
