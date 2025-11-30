import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, "../../reglo.db"));

let initialized = false;

export function initDb() {
  if (initialized) return;

  // Enable foreign keys
  db.pragma("foreign_keys = ON");

  // Create tables
  db.exec(`
    -- Magasins
    CREATE TABLE IF NOT EXISTS stores (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logo TEXT,
      color TEXT,
      website TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Produits
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      barcode TEXT,
      name TEXT NOT NULL,
      brand TEXT,
      category TEXT,
      image_url TEXT,
      unit TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Prix (historique)
    CREATE TABLE IF NOT EXISTS prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      store_id TEXT NOT NULL,
      price REAL NOT NULL,
      currency TEXT DEFAULT 'EUR',
      available INTEGER DEFAULT 1,
      scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (store_id) REFERENCES stores(id)
    );

    -- Index pour les recherches rapides
    CREATE INDEX IF NOT EXISTS idx_prices_product ON prices(product_id);
    CREATE INDEX IF NOT EXISTS idx_prices_store ON prices(store_id);
    CREATE INDEX IF NOT EXISTS idx_prices_date ON prices(scraped_at);
    CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);
  `);

  initialized = true;
  console.log("✅ Database initialized");
}

// Lazy initialization des prepared statements
let _productQueries = null;
let _storeQueries = null;
let _priceQueries = null;

export const productQueries = {
  get getAll() {
    initDb();
    return db.prepare("SELECT * FROM products ORDER BY name");
  },
  get getById() {
    initDb();
    return db.prepare("SELECT * FROM products WHERE id = ?");
  },
  get getByBarcode() {
    initDb();
    return db.prepare("SELECT * FROM products WHERE barcode = ?");
  },
  get getByCategory() {
    initDb();
    return db.prepare("SELECT * FROM products WHERE category = ?");
  },
  get search() {
    initDb();
    return db.prepare("SELECT * FROM products WHERE name LIKE ? OR brand LIKE ?");
  },
  get insert() {
    initDb();
    return db.prepare(`
      INSERT OR REPLACE INTO products (id, barcode, name, brand, category, image_url, unit, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
  },
  get deleteAll() {
    initDb();
    return db.prepare("DELETE FROM products");
  },
};

export const storeQueries = {
  get getAll() {
    initDb();
    return db.prepare("SELECT * FROM stores");
  },
  get getById() {
    initDb();
    return db.prepare("SELECT * FROM stores WHERE id = ?");
  },
  get insert() {
    initDb();
    return db.prepare(`
      INSERT OR REPLACE INTO stores (id, name, logo, color, website)
      VALUES (?, ?, ?, ?, ?)
    `);
  },
  get deleteAll() {
    initDb();
    return db.prepare("DELETE FROM stores");
  },
};

export const priceQueries = {
  get getLatestByProduct() {
    initDb();
    return db.prepare(`
      SELECT p.*, s.name as store_name, s.logo as store_logo, s.color as store_color
      FROM prices p
      JOIN stores s ON p.store_id = s.id
      WHERE p.product_id = ?
      AND p.scraped_at = (
        SELECT MAX(scraped_at) FROM prices
        WHERE product_id = p.product_id AND store_id = p.store_id
      )
      ORDER BY p.price ASC
    `);
  },
  get getByStore() {
    initDb();
    return db.prepare(`
      SELECT p.*, pr.name as product_name, pr.brand as product_brand, pr.image_url
      FROM prices p
      JOIN products pr ON p.product_id = pr.id
      WHERE p.store_id = ?
      AND p.scraped_at = (
        SELECT MAX(scraped_at) FROM prices
        WHERE product_id = p.product_id AND store_id = p.store_id
      )
    `);
  },
  get insert() {
    initDb();
    return db.prepare(`
      INSERT INTO prices (product_id, store_id, price, available)
      VALUES (?, ?, ?, ?)
    `);
  },
  get getComparison() {
    initDb();
    return db.prepare(`
      SELECT
        p.product_id,
        p.store_id,
        p.price,
        p.available,
        s.name as store_name,
        s.logo as store_logo,
        s.color as store_color,
        pr.name as product_name,
        pr.brand as product_brand,
        pr.image_url,
        pr.unit
      FROM prices p
      JOIN stores s ON p.store_id = s.id
      JOIN products pr ON p.product_id = pr.id
      WHERE p.scraped_at = (
        SELECT MAX(scraped_at) FROM prices
        WHERE product_id = p.product_id AND store_id = p.store_id
      )
      ORDER BY pr.name, p.price
    `);
  },
  get deleteAll() {
    initDb();
    return db.prepare("DELETE FROM prices");
  },
};

export default db;
