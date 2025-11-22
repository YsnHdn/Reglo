import { Router } from "express";
import { productQueries, priceQueries } from "../db/database.js";
import { searchOpenFoodFacts, getProductByBarcode } from "../services/openfoodfacts.js";

const router = Router();

// GET /api/products - Liste tous les produits
router.get("/", (req, res) => {
  try {
    const { category, search } = req.query;

    let products;
    if (search) {
      products = productQueries.search.all(`%${search}%`, `%${search}%`);
    } else if (category) {
      products = productQueries.getByCategory.all(category);
    } else {
      products = productQueries.getAll.all();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Détails d'un produit avec ses prix
router.get("/:id", (req, res) => {
  try {
    const product = productQueries.getById.get(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const prices = priceQueries.getLatestByProduct.all(product.id);

    res.json({
      ...product,
      prices,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/barcode/:barcode - Chercher par code-barres
router.get("/barcode/:barcode", async (req, res) => {
  try {
    let product = productQueries.getByBarcode.get(req.params.barcode);

    // Si pas trouvé localement, chercher sur Open Food Facts
    if (!product) {
      const offProduct = await getProductByBarcode(req.params.barcode);
      if (offProduct) {
        // Sauvegarder dans notre base
        productQueries.insert.run(
          offProduct.id,
          offProduct.barcode,
          offProduct.name,
          offProduct.brand,
          offProduct.category,
          offProduct.image_url,
          offProduct.unit
        );
        product = offProduct;
      }
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const prices = priceQueries.getLatestByProduct.all(product.id);
    res.json({ ...product, prices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products/search/openfoodfacts - Chercher sur Open Food Facts
router.post("/search/openfoodfacts", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const products = await searchOpenFoodFacts(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
