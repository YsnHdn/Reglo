/**
 * Script de seed pour initialiser la base de données avec des données réalistes
 * Ces prix sont basés sur des observations des prix réels en France (2024-2025)
 *
 * Usage: npm run db:seed
 */
import { initDb, productQueries, priceQueries, storeQueries } from "./database.js";

// Magasins
const stores = [
  { id: "carrefour", name: "Carrefour", logo: "🔵", color: "#004E9A", website: "https://www.carrefour.fr" },
  { id: "auchan", name: "Auchan", logo: "🔴", color: "#E30613", website: "https://www.auchan.fr" },
  { id: "monoprix", name: "Monoprix", logo: "🟠", color: "#E4002B", website: "https://www.monoprix.fr" },
  { id: "lidl", name: "Lidl", logo: "🟡", color: "#0050AA", website: "https://www.lidl.fr" },
  { id: "leclerc", name: "E.Leclerc", logo: "🔵", color: "#005BAC", website: "https://www.leclercdrive.fr" },
];

// Produits avec prix réalistes par magasin (prix en euros, basés sur les prix réels 2024-2025)
const productsWithPrices = [
  // PÂTES
  {
    id: "panzani-spaghetti-500g",
    barcode: "3038350012005",
    name: "Spaghetti n°5",
    brand: "Panzani",
    category: "Pâtes",
    image_url: "https://images.openfoodfacts.org/images/products/303/835/001/2005/front_fr.jpg",
    unit: "500g",
    prices: {
      carrefour: 1.45,
      auchan: 1.39,
      monoprix: 1.75,
      lidl: 1.29,
      leclerc: 1.35,
    },
  },
  {
    id: "barilla-penne-500g",
    barcode: "8076800105735",
    name: "Penne Rigate n°73",
    brand: "Barilla",
    category: "Pâtes",
    image_url: "https://images.openfoodfacts.org/images/products/807/680/010/5735/front_fr.jpg",
    unit: "500g",
    prices: {
      carrefour: 1.65,
      auchan: 1.55,
      monoprix: 1.89,
      lidl: 1.49,
      leclerc: 1.52,
    },
  },
  {
    id: "lustucru-coquillettes-500g",
    barcode: "3250392665500",
    name: "Coquillettes",
    brand: "Lustucru",
    category: "Pâtes",
    image_url: "https://images.openfoodfacts.org/images/products/325/039/266/5500/front_fr.jpg",
    unit: "500g",
    prices: {
      carrefour: 1.25,
      auchan: 1.22,
      monoprix: 1.49,
      lidl: 1.19,
      leclerc: 1.20,
    },
  },

  // CAFÉ
  {
    id: "carte-noire-classique-250g",
    barcode: "7622210146960",
    name: "Café Moulu Classique",
    brand: "Carte Noire",
    category: "Café",
    image_url: "https://images.openfoodfacts.org/images/products/762/221/014/6960/front_fr.jpg",
    unit: "250g",
    prices: {
      carrefour: 4.89,
      auchan: 4.75,
      monoprix: 5.29,
      lidl: 4.49,
      leclerc: 4.59,
    },
  },
  {
    id: "lavazza-qualita-oro-250g",
    barcode: "8000070012677",
    name: "Qualità Oro",
    brand: "Lavazza",
    category: "Café",
    image_url: "https://images.openfoodfacts.org/images/products/800/007/001/2677/front_fr.jpg",
    unit: "250g",
    prices: {
      carrefour: 5.49,
      auchan: 5.29,
      monoprix: 5.89,
      lidl: 4.99,
      leclerc: 5.15,
    },
  },
  {
    id: "nescafe-gold-200g",
    barcode: "7613034056467",
    name: "Gold",
    brand: "Nescafé",
    category: "Café",
    image_url: "https://images.openfoodfacts.org/images/products/761/303/405/6467/front_fr.jpg",
    unit: "200g",
    prices: {
      carrefour: 7.99,
      auchan: 7.79,
      monoprix: 8.49,
      lidl: null, // Non disponible
      leclerc: 7.65,
    },
  },

  // CHOCOLAT
  {
    id: "milka-lait-100g",
    barcode: "7622210100467",
    name: "Chocolat au Lait des Alpes",
    brand: "Milka",
    category: "Chocolat",
    image_url: "https://images.openfoodfacts.org/images/products/762/221/010/0467/front_fr.jpg",
    unit: "100g",
    prices: {
      carrefour: 1.89,
      auchan: 1.79,
      monoprix: 2.15,
      lidl: 1.59,
      leclerc: 1.69,
    },
  },
  {
    id: "lindt-excellence-70-100g",
    barcode: "3046920028363",
    name: "Excellence Noir 70%",
    brand: "Lindt",
    category: "Chocolat",
    image_url: "https://images.openfoodfacts.org/images/products/304/692/002/8363/front_fr.jpg",
    unit: "100g",
    prices: {
      carrefour: 2.49,
      auchan: 2.39,
      monoprix: 2.79,
      lidl: null, // Non disponible
      leclerc: 2.35,
    },
  },
  {
    id: "cote-dor-lait-noisettes-200g",
    barcode: "5410033002133",
    name: "Lait Noisettes Entières",
    brand: "Côte d'Or",
    category: "Chocolat",
    image_url: "https://images.openfoodfacts.org/images/products/541/003/300/2133/front_fr.jpg",
    unit: "200g",
    prices: {
      carrefour: 3.29,
      auchan: 3.15,
      monoprix: 3.69,
      lidl: 2.99,
      leclerc: 3.09,
    },
  },

  // BOISSONS
  {
    id: "coca-cola-original-1.5l",
    barcode: "5449000000996",
    name: "Coca-Cola Original",
    brand: "Coca-Cola",
    category: "Boissons",
    image_url: "https://images.openfoodfacts.org/images/products/544/900/000/0996/front_fr.jpg",
    unit: "1.5L",
    prices: {
      carrefour: 1.99,
      auchan: 1.89,
      monoprix: 2.29,
      lidl: 1.79,
      leclerc: 1.85,
    },
  },
  {
    id: "evian-1.5l",
    barcode: "3068320011349",
    name: "Eau Minérale Naturelle",
    brand: "Evian",
    category: "Boissons",
    image_url: "https://images.openfoodfacts.org/images/products/306/832/001/1349/front_fr.jpg",
    unit: "1.5L",
    prices: {
      carrefour: 0.89,
      auchan: 0.85,
      monoprix: 1.09,
      lidl: 0.79,
      leclerc: 0.82,
    },
  },
  {
    id: "orangina-original-1.5l",
    barcode: "3249390003556",
    name: "Orangina Original",
    brand: "Orangina",
    category: "Boissons",
    image_url: "https://images.openfoodfacts.org/images/products/324/939/000/3556/front_fr.jpg",
    unit: "1.5L",
    prices: {
      carrefour: 2.15,
      auchan: 2.05,
      monoprix: 2.45,
      lidl: 1.95,
      leclerc: 1.99,
    },
  },

  // PRODUITS LAITIERS
  {
    id: "lactel-demi-ecreme-1l",
    barcode: "3428274370003",
    name: "Lait Demi-écrémé",
    brand: "Lactel",
    category: "Produits laitiers",
    image_url: "https://images.openfoodfacts.org/images/products/342/827/437/0003/front_fr.jpg",
    unit: "1L",
    prices: {
      carrefour: 1.15,
      auchan: 1.09,
      monoprix: 1.35,
      lidl: 0.99,
      leclerc: 1.05,
    },
  },
  {
    id: "danone-nature-4x125g",
    barcode: "3033490004149",
    name: "Yaourt Nature",
    brand: "Danone",
    category: "Produits laitiers",
    image_url: "https://images.openfoodfacts.org/images/products/303/349/000/4149/front_fr.jpg",
    unit: "4x125g",
    prices: {
      carrefour: 1.79,
      auchan: 1.69,
      monoprix: 2.05,
      lidl: 1.59,
      leclerc: 1.65,
    },
  },
  {
    id: "president-beurre-doux-250g",
    barcode: "3228020480016",
    name: "Beurre Doux",
    brand: "Président",
    category: "Produits laitiers",
    image_url: "https://images.openfoodfacts.org/images/products/322/802/048/0016/front_fr.jpg",
    unit: "250g",
    prices: {
      carrefour: 2.89,
      auchan: 2.75,
      monoprix: 3.19,
      lidl: 2.59,
      leclerc: 2.69,
    },
  },

  // CÉRÉALES
  {
    id: "kelloggs-corn-flakes-375g",
    barcode: "5053827165556",
    name: "Corn Flakes",
    brand: "Kellogg's",
    category: "Céréales",
    image_url: "https://images.openfoodfacts.org/images/products/505/382/716/5556/front_fr.jpg",
    unit: "375g",
    prices: {
      carrefour: 3.49,
      auchan: 3.35,
      monoprix: 3.89,
      lidl: 3.19,
      leclerc: 3.29,
    },
  },
  {
    id: "nestle-chocapic-430g",
    barcode: "7613039361528",
    name: "Chocapic",
    brand: "Nestlé",
    category: "Céréales",
    image_url: "https://images.openfoodfacts.org/images/products/761/303/936/1528/front_fr.jpg",
    unit: "430g",
    prices: {
      carrefour: 3.99,
      auchan: 3.85,
      monoprix: 4.29,
      lidl: 3.69,
      leclerc: 3.79,
    },
  },
];

async function seed() {
  console.log("🌱 Seeding database...\n");

  // Initialize DB
  initDb();

  // Insert stores
  console.log("📍 Inserting stores...");
  stores.forEach((store) => {
    storeQueries.insert.run(store.id, store.name, store.logo, store.color, store.website);
    console.log(`   ✓ ${store.name}`);
  });

  // Insert products and prices
  console.log("\n📦 Inserting products and prices...");
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
    console.log(`   ✓ ${product.brand} ${product.name}`);

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
  console.log(`✅ Seed complete!`);
  console.log(`   Stores: ${stores.length}`);
  console.log(`   Products: ${productsWithPrices.length}`);
  console.log(`   Prices: ${priceCount}`);
  console.log("=".repeat(50));
}

seed().catch(console.error);
