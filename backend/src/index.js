import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import productsRouter from "./routes/products.js";
import pricesRouter from "./routes/prices.js";
import storesRouter from "./routes/stores.js";
import { initDb } from "./db/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images
app.use("/images", express.static(join(__dirname, "../public/images")));

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
