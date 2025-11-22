import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import pricesRouter from "./routes/prices.js";
import storesRouter from "./routes/stores.js";
import { initDb } from "./db/database.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDb();

// Routes
app.use("/api/products", productsRouter);
app.use("/api/prices", pricesRouter);
app.use("/api/stores", storesRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Reglo Backend running on http://localhost:${PORT}`);
});
