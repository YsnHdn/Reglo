/**
 * Script pour exécuter le scraping des prix sur les sites marocains
 * Usage: npm run scrape
 */
import { searchAllStores } from "./index.js";
import { initDb, productQueries, priceQueries, storeQueries } from "../db/database.js";
import { downloadImage } from "../utils/imageDownloader.js";

// Liste des produits à scraper (adaptés au marché marocain)
const PRODUCTS_TO_SCRAPE = [
  // Pâtes
  { search: "panzani spaghetti", category: "Pâtes" },
  { search: "barilla penne", category: "Pâtes" },
  { search: "dari couscous", category: "Pâtes" },

  // Café
  { search: "carte noire café", category: "Café" },
  { search: "nescafe gold", category: "Café" },
  { search: "najjar café", category: "Café" },

  // Chocolat
  { search: "milka chocolat", category: "Chocolat" },
  { search: "aiguebelle chocolat", category: "Chocolat" },
  { search: "cote d'or chocolat", category: "Chocolat" },

  // Boissons
  { search: "coca cola 1.5l", category: "Boissons" },
  { search: "hawai jus", category: "Boissons" },
  { search: "sidi ali eau", category: "Boissons" },

  // Produits laitiers
  { search: "centrale lait", category: "Produits laitiers" },
  { search: "activia yaourt", category: "Produits laitiers" },
  { search: "jaouda beurre", category: "Produits laitiers" },

  // Céréales
  { search: "nestle fitness", category: "Céréales" },
  { search: "chocapic", category: "Céréales" },
];

async function runScraper() {
  console.log("🇲🇦 Starting Moroccan price scraper...\n");

  // Initialize DB
  initDb();

  // Initialize Moroccan stores
  const stores = [
    { id: "marjane", name: "Marjane", logo: "🔴", color: "#E30613", website: "https://www.marjane.ma" },
    { id: "marjanemall", name: "Marjane Mall", logo: "🟠", color: "#FF6B00", website: "https://www.marjanemall.ma" },
    { id: "aswakassalam", name: "Aswak Assalam", logo: "🟢", color: "#00A651", website: "https://aswakassalam.com" },
    { id: "carrefour", name: "Carrefour", logo: "🔵", color: "#004E9A", website: "https://www.carrefour.ma" },
    { id: "acima", name: "Acima", logo: "🟡", color: "#FDB913", website: "https://www.acima.ma" },
  ];

  stores.forEach((store) => {
    storeQueries.insert.run(store.id, store.name, store.logo, store.color, store.website);
  });

  console.log("✅ Moroccan stores initialized\n");

  let totalProducts = 0;
  let totalPrices = 0;
  let totalImages = 0;

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

        // Télécharger l'image si disponible
        let imageUrl = product.image_url || "";
        if (imageUrl && imageUrl.startsWith("http")) {
          const localPath = await downloadImage(imageUrl, productId);
          if (localPath) {
            imageUrl = localPath;
            totalImages++;
          }
        }

        // Insérer le produit
        productQueries.insert.run(
          productId,
          null, // barcode
          product.name,
          product.brand || "",
          category,
          imageUrl,
          product.unit || ""
        );
        totalProducts++;

        // Insérer le prix
        priceQueries.insert.run(productId, store, product.price, product.available ? 1 : 0);
        totalPrices++;

        console.log(`  ✓ [${store}] ${product.name}: ${product.price} MAD`);
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
  console.log(`   Images downloaded: ${totalImages}`);
  console.log(`   Currency: MAD (Dirham marocain)`);
  console.log("=".repeat(50));
}

// Run the scraper
runScraper().catch(console.error);
