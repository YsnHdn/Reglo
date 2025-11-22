const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface Product {
  id: string;
  barcode: string | null;
  name: string;
  brand: string;
  category: string;
  image_url: string | null;
  unit: string;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  color: string;
  website: string;
}

export interface Price {
  product_id: string;
  store_id: string;
  price: number;
  available: number;
  store_name: string;
  store_logo: string;
  store_color: string;
}

export interface ProductWithPrices extends Product {
  prices: Price[];
}

export interface StoreCluster {
  store: Store;
  products: {
    id: string;
    name: string;
    brand: string;
    image_url: string | null;
    unit: string;
    price: number;
    available: boolean;
    isCheapest: boolean;
  }[];
  totalPrice: number;
  productCount: number;
  savings: number;
}

export interface ComparisonResult {
  clusters: StoreCluster[];
  summary: {
    cheapestStore: string;
    cheapestTotal: number;
    maxSavings: number;
  };
}

// Récupérer tous les produits
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

// Récupérer les produits par catégorie
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(category)}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

// Rechercher des produits
export async function searchProducts(query: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search products");
  return response.json();
}

// Récupérer un produit avec ses prix
export async function getProductWithPrices(productId: string): Promise<ProductWithPrices> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

// Récupérer tous les magasins
export async function getStores(): Promise<Store[]> {
  const response = await fetch(`${API_BASE_URL}/stores`);
  if (!response.ok) throw new Error("Failed to fetch stores");
  return response.json();
}

// Comparer les prix pour une liste de produits
export async function compareProducts(productIds: string[]): Promise<ComparisonResult> {
  const response = await fetch(`${API_BASE_URL}/prices/compare?productIds=${productIds.join(",")}`);
  if (!response.ok) throw new Error("Failed to compare products");
  return response.json();
}

// Rechercher sur Open Food Facts
export async function searchOpenFoodFacts(query: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/search/openfoodfacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error("Failed to search Open Food Facts");
  return response.json();
}

export default {
  getProducts,
  getProductsByCategory,
  searchProducts,
  getProductWithPrices,
  getStores,
  compareProducts,
  searchOpenFoodFacts,
};
