/**
 * Script pour exécuter le scraping des prix
 * Usage: node src/scrapers/run.js
 */
import { searchAllStores } from "./index.js";
import { initDb, productQueries, priceQueries, storeQueries } from "../db/database.js";

// Liste des produits à scraper
const PRODUCTS_TO_SCRAPE = [
  { search: "panzani spaghetti", category: "Pâtes" },
  { search: "barilla penne", category: "Pâtes" },
  { search: "lustucru coquillettes", category: "Pâtes" },
  { search: "carte noire café moulu", category: "Café" },
  { search: "lavazza qualita oro", category: "Café" },
  { search: "nescafe gold", category: "Café" },
  { search: "milka chocolat lait", category: "Chocolat" },
  { search: "lindt excellence noir", category: "Chocolat" },
  { search: "coca cola 1.5l", category: "Boissons" },
  { search: "evian 1.5l", category: "Boissons" },
  { search: "orangina 1.5l", category: "Boissons" },
  { search: "lactel lait demi écrémé", category: "Produits laitiers" },
  { search: "danone nature", category: "Produits laitiers" },
  { search: "président beurre", category: "Produits laitiers" },
  { search: "kelloggs corn flakes", category: "Céréales" },
  { search: "nestle chocapic", category: "Céréales" },
];

async function runScraper() {
  console.log("🚀 Starting price scraper...\n");

  // Initialize DB
  initDb();

  // Initialize stores
  const stores = [
    { id: "carrefour", name: "Carrefour", logo: "🔵", color: "#004E9A", website: "https://www.carrefour.fr" },
    { id: "auchan", name: "Auchan", logo: "🔴", color: "#E30613", website: "https://www.auchan.fr" },
    { id: "monoprix", name: "Monoprix", logo: "🔴", color: "#E4002B", website: "https://www.monoprix.fr" },
    { id: "lidl", name: "Lidl", logo: "🟡", color: "#0050AA", website: "https://www.lidl.fr" },
  ];

  stores.forEach((store) => {
    storeQueries.insert.run(store.id, store.name, store.logo, store.color, store.website);
  });

  console.log("✅ Stores initialized\n");

  let totalProducts = 0;
  let totalPrices = 0;

  for (const { search, category } of PRODUCTS_TO_SCRAPE) {
    console.log(`\n📦 Searching for: ${search}`);

    try {
      const results = await searchAllStores(search);

      for (const { store, products } of results) {
        if (products.length === 0) continue;

        // Prendre le premier résultat le plus pertinent
        const product = products[0];

        // Créer un ID unique pour le produit
        const productId = `${product.brand || "unknown"}-${search}`
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-");

        // Insérer le produit
        productQueries.insert.run(
          productId,
          null, // barcode
          product.name,
          product.brand || "",
          category,
          product.image_url || "",
          product.unit || ""
        );
        totalProducts++;

        // Insérer le prix
        priceQueries.insert.run(productId, store, product.price, product.available ? 1 : 0);
        totalPrices++;

        console.log(`  ✓ [${store}] ${product.name}: ${product.price}€`);
      }
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
    }

    // Attendre entre chaque recherche pour éviter le rate limiting
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Scraping complete!`);
  console.log(`   Products: ${totalProducts}`);
  console.log(`   Prices: ${totalPrices}`);
  console.log("=".repeat(50));
}

// Run the scraper
runScraper().catch(console.error);
