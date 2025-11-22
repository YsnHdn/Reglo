import { Router } from "express";
import { storeQueries, priceQueries } from "../db/database.js";

const router = Router();

// GET /api/stores - Liste tous les magasins
router.get("/", (req, res) => {
  try {
    const stores = storeQueries.getAll.all();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/stores/:id - Détails d'un magasin avec ses produits
router.get("/:id", (req, res) => {
  try {
    const store = storeQueries.getById.get(req.params.id);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    const products = priceQueries.getByStore.all(store.id);

    res.json({
      ...store,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
