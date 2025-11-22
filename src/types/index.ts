// Types pour les produits
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  unit: string; // "500g", "1L", "250g", etc.
}

// Types pour les magasins
export interface Store {
  id: string;
  name: string;
  logo: string;
  color: string; // Couleur de la marque
}

// Prix d'un produit dans un magasin
export interface ProductPrice {
  productId: string;
  storeId: string;
  price: number;
  available: boolean;
}

// Produit avec son prix dans un magasin spécifique
export interface ProductWithPrice extends Product {
  price: number;
  available: boolean;
  isCheapest?: boolean;
}

// Cluster de magasin avec les produits sélectionnés
export interface StoreCluster {
  store: Store;
  products: ProductWithPrice[];
  totalPrice: number;
  savings: number; // Économies par rapport au magasin le plus cher
}

// État de la sélection utilisateur
export interface CartState {
  selectedProducts: string[]; // IDs des produits sélectionnés
}
