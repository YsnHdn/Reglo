/**
 * Script de seed pour le Maroc avec des produits réels
 * Prix basés sur les prix moyens au Maroc en 2024-2025 (en MAD - Dirhams)
 *
 * Usage: npm run db:seed:morocco
 */
import { initDb, productQueries, priceQueries, storeQueries } from "./database.js";

// Magasins marocains
const stores = [
  { id: "marjane", name: "Marjane", logo: "🔴", color: "#E30613", website: "https://www.marjane.ma" },
  { id: "marjanemall", name: "Marjane Mall", logo: "🟠", color: "#FF6B00", website: "https://www.marjanemall.ma" },
  { id: "aswakassalam", name: "Aswak Assalam", logo: "🟢", color: "#00A651", website: "https://aswakassalam.com" },
  { id: "carrefour", name: "Carrefour", logo: "🔵", color: "#004E9A", website: "https://www.carrefour.ma" },
  { id: "acima", name: "Acima", logo: "🟡", color: "#FDB913", website: "https://www.acima.ma" },
];

// Produits marocains réels avec prix en MAD (Dirhams marocains)
const productsWithPrices = [
  // PÂTES
  {
    id: "panzani-spaghetti-500g",
    barcode: "3038350012005",
    name: "Spaghetti n°5",
    brand: "Panzani",
    category: "Pâtes",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/3/0/3038350012005_1.jpg",
    unit: "500g",
    prices: {
      marjane: 10.95,
      marjanemall: 11.50,
      aswakassalam: 11.20,
      carrefour: 10.90,
      acima: 11.00,
    },
  },
  {
    id: "barilla-penne-500g",
    barcode: "8076800105735",
    name: "Penne Rigate n°73",
    brand: "Barilla",
    category: "Pâtes",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/8/0/8076800105735_1.jpg",
    unit: "500g",
    prices: {
      marjane: 13.50,
      marjanemall: 14.00,
      aswakassalam: 13.80,
      carrefour: 13.30,
      acima: 13.60,
    },
  },
  {
    id: "dari-couscous-moyen-1kg",
    barcode: "6111000011001",
    name: "Couscous Moyen",
    brand: "Dari",
    category: "Pâtes",
    image_url: "https://www.marjanemall.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/6/1/6111000011001.jpg",
    unit: "1kg",
    prices: {
      marjane: 12.90,
      marjanemall: 13.20,
      aswakassalam: 12.80,
      carrefour: 13.00,
      acima: 12.70,
    },
  },

  // CAFÉ
  {
    id: "carte-noire-classique-250g",
    barcode: "7622210146960",
    name: "Café Moulu Classique",
    brand: "Carte Noire",
    category: "Café",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/7/6/7622210146960_1.jpg",
    unit: "250g",
    prices: {
      marjane: 48.90,
      marjanemall: 49.50,
      aswakassalam: 49.20,
      carrefour: 48.50,
      acima: 49.00,
    },
  },
  {
    id: "nescafe-gold-200g",
    barcode: "7613034056467",
    name: "Gold",
    brand: "Nescafé",
    category: "Café",
    image_url: "https://www.marjanemall.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/7/6/7613034056467.jpg",
    unit: "200g",
    prices: {
      marjane: 79.90,
      marjanemall: 80.50,
      aswakassalam: null, // Non disponible
      carrefour: 78.90,
      acima: 79.50,
    },
  },
  {
    id: "cafe-najjar-250g",
    barcode: "5291001801011",
    name: "Café Moulu avec Cardamome",
    brand: "Najjar",
    category: "Café",
    image_url: "https://www.marjanemall.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/5/2/5291001801011.jpg",
    unit: "250g",
    prices: {
      marjane: 42.90,
      marjanemall: 43.50,
      aswakassalam: 43.20,
      carrefour: 42.50,
      acima: 43.00,
    },
  },

  // CHOCOLAT
  {
    id: "milka-lait-100g",
    barcode: "7622210100467",
    name: "Chocolat au Lait des Alpes",
    brand: "Milka",
    category: "Chocolat",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/7/6/7622210100467_1.jpg",
    unit: "100g",
    prices: {
      marjane: 16.90,
      marjanemall: 17.50,
      aswakassalam: 17.20,
      carrefour: 16.50,
      acima: 17.00,
    },
  },
  {
    id: "aiguebelle-lait-100g",
    barcode: "6111851000015",
    name: "Chocolat au Lait",
    brand: "Aiguebelle",
    category: "Chocolat",
    image_url: "https://www.marjanemall.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/6/1/6111851000015.jpg",
    unit: "100g",
    prices: {
      marjane: 9.90,
      marjanemall: 10.20,
      aswakassalam: 9.80,
      carrefour: 9.70,
      acima: 9.85,
    },
  },
  {
    id: "cote-dor-lait-noisettes-200g",
    barcode: "5410033002133",
    name: "Lait Noisettes Entières",
    brand: "Côte d'Or",
    category: "Chocolat",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/5/4/5410033002133_1.jpg",
    unit: "200g",
    prices: {
      marjane: 32.90,
      marjanemall: 33.50,
      aswakassalam: 33.20,
      carrefour: 32.50,
      acima: 33.00,
    },
  },

  // BOISSONS
  {
    id: "coca-cola-1.5l",
    barcode: "5449000000996",
    name: "Coca-Cola Original",
    brand: "Coca-Cola",
    category: "Boissons",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/5/4/5449000000996_1.jpg",
    unit: "1.5L",
    prices: {
      marjane: 8.90,
      marjanemall: 9.20,
      aswakassalam: 9.00,
      carrefour: 8.80,
      acima: 8.95,
    },
  },
  {
    id: "hawai-ananas-1l",
    barcode: "6111011100014",
    name: "Jus d'Ananas",
    brand: "Hawai",
    category: "Boissons",
    image_url: "https://www.marjanemall.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/6/1/6111011100014.jpg",
    unit: "1L",
    prices: {
      marjane: 9.50,
      marjanemall: 9.80,
      aswakassalam: 9.60,
      carrefour: 9.40,
      acima: 9.55,
    },
  },
  {
    id: "sidi-ali-1.5l",
    barcode: "6111000101012",
    name: "Eau Minérale Naturelle",
    brand: "Sidi Ali",
    category: "Boissons",
    image_url: "https://www.marjanemall.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/6/1/6111000101012.jpg",
    unit: "1.5L",
    prices: {
      marjane: 4.50,
      marjanemall: 4.70,
      aswakassalam: 4.60,
      carrefour: 4.40,
      acima: 4.55,
    },
  },

  // PRODUITS LAITIERS
  {
    id: "centrale-lait-demi-ecreme-1l",
    barcode: "6111008000011",
    name: "Lait Demi-écrémé",
    brand: "Centrale Danone",
    category: "Produits laitiers",
    image_url: "https://www.marjanemall.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/6/1/6111008000011.jpg",
    unit: "1L",
    prices: {
      marjane: 8.90,
      marjanemall: 9.20,
      aswakassalam: 9.00,
      carrefour: 8.80,
      acima: 8.95,
    },
  },
  {
    id: "activia-nature-4x125g",
    barcode: "6111008100012",
    name: "Yaourt Nature",
    brand: "Activia",
    category: "Produits laitiers",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/6/1/6111008100012_1.jpg",
    unit: "4x125g",
    prices: {
      marjane: 11.90,
      marjanemall: 12.20,
      aswakassalam: 12.00,
      carrefour: 11.80,
      acima: 11.95,
    },
  },
  {
    id: "jaouda-beurre-250g",
    barcode: "6111009000013",
    name: "Beurre Doux",
    brand: "Jaouda",
    category: "Produits laitiers",
    image_url: "https://www.marjanemall.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/6/1/6111009000013.jpg",
    unit: "250g",
    prices: {
      marjane: 23.90,
      marjanemall: 24.50,
      aswakassalam: 24.20,
      carrefour: 23.50,
      acima: 24.00,
    },
  },

  // CÉRÉALES
  {
    id: "nestle-fitness-375g",
    barcode: "7613032712914",
    name: "Fitness Céréales",
    brand: "Nestlé",
    category: "Céréales",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/7/6/7613032712914_1.jpg",
    unit: "375g",
    prices: {
      marjane: 38.90,
      marjanemall: 39.50,
      aswakassalam: 39.20,
      carrefour: 38.50,
      acima: 39.00,
    },
  },
  {
    id: "nestle-chocapic-430g",
    barcode: "7613039361528",
    name: "Chocapic",
    brand: "Nestlé",
    category: "Céréales",
    image_url: "https://www.marjane.ma/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/7/6/7613039361528_1.jpg",
    unit: "430g",
    prices: {
      marjane: 42.90,
      marjanemall: 43.50,
      aswakassalam: 43.20,
      carrefour: 42.50,
      acima: 43.00,
    },
  },
];

async function seed() {
  console.log("🇲🇦 Seeding database with Moroccan data...\n");

  // Initialize DB
  initDb();

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  try {
    productQueries.deleteAll.run();
    priceQueries.deleteAll.run();
    storeQueries.deleteAll.run();
    console.log("   ✓ Existing data cleared");
  } catch (error) {
    console.log("   ⚠ No existing data to clear");
  }

  // Insert stores
  console.log("\n📍 Inserting Moroccan stores...");
  stores.forEach((store) => {
    storeQueries.insert.run(store.id, store.name, store.logo, store.color, store.website);
    console.log(`   ✓ ${store.name}`);
  });

  // Insert products and prices
  console.log("\n📦 Inserting products and prices (in MAD)...");
  let priceCount = 0;

  productsWithPrices.forEach((product) => {
    // Insert product
    productQueries.insert.run(
      product.id,
      product.barcode,
      product.name,
      product.brand,
      product.category,
      product.image_url,
      product.unit
    );
    console.log(`   ✓ ${product.brand} ${product.name} (${product.unit})`);

    // Insert prices for each store
    Object.entries(product.prices).forEach(([storeId, price]) => {
      if (price !== null) {
        priceQueries.insert.run(product.id, storeId, price, 1);
        priceCount++;
      } else {
        // Produit non disponible dans ce magasin
        priceQueries.insert.run(product.id, storeId, 0, 0);
        priceCount++;
      }
    });
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Seed complete! (Moroccan Market)`);
  console.log(`   Stores: ${stores.length}`);
  console.log(`   Products: ${productsWithPrices.length}`);
  console.log(`   Prices: ${priceCount}`);
  console.log(`   Currency: MAD (Moroccan Dirham)`);
  console.log("=".repeat(50));
  console.log("\n💡 Prix en Dirhams marocains (MAD)");
  console.log("   1 EUR ≈ 10.8 MAD (estimation)");
}

seed().catch(console.error);
