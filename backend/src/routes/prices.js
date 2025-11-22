import { Router } from "express";
import { priceQueries, storeQueries, productQueries } from "../db/database.js";

const router = Router();

// GET /api/prices/compare - Comparer les prix pour une liste de produits
router.get("/compare", (req, res) => {
  try {
    const { productIds } = req.query;

    if (!productIds) {
      return res.status(400).json({ error: "productIds query parameter required" });
    }

    const ids = productIds.split(",");
    const stores = storeQueries.getAll.all();
    const allPrices = priceQueries.getComparison.all();

    // Filtrer par produits sélectionnés
    const filteredPrices = allPrices.filter((p) => ids.includes(p.product_id));

    // Organiser par magasin (clusters)
    const clusters = stores.map((store) => {
      const storeProducts = filteredPrices
        .filter((p) => p.store_id === store.id)
        .map((p) => ({
          id: p.product_id,
          name: p.product_name,
          brand: p.product_brand,
          image_url: p.image_url,
          unit: p.unit,
          price: p.price,
          available: p.available === 1,
        }));

      const totalPrice = storeProducts
        .filter((p) => p.available)
        .reduce((sum, p) => sum + p.price, 0);

      return {
        store: {
          id: store.id,
          name: store.name,
          logo: store.logo,
          color: store.color,
        },
        products: storeProducts,
        totalPrice,
        productCount: storeProducts.filter((p) => p.available).length,
      };
    });

    // Calculer le meilleur prix pour chaque produit
    const cheapestPrices = {};
    ids.forEach((productId) => {
      const prices = filteredPrices
        .filter((p) => p.product_id === productId && p.available === 1)
        .map((p) => p.price);
      if (prices.length > 0) {
        cheapestPrices[productId] = Math.min(...prices);
      }
    });

    // Marquer les produits les moins chers
    clusters.forEach((cluster) => {
      cluster.products.forEach((product) => {
        product.isCheapest = product.price === cheapestPrices[product.id];
      });
    });

    // Calculer les économies
    const maxTotal = Math.max(...clusters.map((c) => c.totalPrice));
    clusters.forEach((cluster) => {
      cluster.savings = maxTotal - cluster.totalPrice;
    });

    // Trier par prix total
    clusters.sort((a, b) => a.totalPrice - b.totalPrice);

    res.json({
      clusters,
      summary: {
        cheapestStore: clusters[0]?.store.name,
        cheapestTotal: clusters[0]?.totalPrice,
        maxSavings: clusters[0]?.savings,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/prices - Ajouter un prix (pour le scraper)
router.post("/", (req, res) => {
  try {
    const { productId, storeId, price, available = true } = req.body;

    if (!productId || !storeId || price === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    priceQueries.insert.run(productId, storeId, price, available ? 1 : 0);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/prices/bulk - Ajouter plusieurs prix (pour le scraper)
router.post("/bulk", (req, res) => {
  try {
    const { prices } = req.body;

    if (!Array.isArray(prices)) {
      return res.status(400).json({ error: "prices must be an array" });
    }

    let inserted = 0;
    prices.forEach(({ productId, storeId, price, available = true }) => {
      if (productId && storeId && price !== undefined) {
        priceQueries.insert.run(productId, storeId, price, available ? 1 : 0);
        inserted++;
      }
    });

    res.status(201).json({ success: true, inserted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
