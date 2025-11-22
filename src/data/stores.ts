import { Store, ProductPrice } from "@/types";

export const stores: Store[] = [
  {
    id: "carrefour",
    name: "Carrefour",
    logo: "🔵",
    color: "#004E9A",
  },
  {
    id: "lidl",
    name: "Lidl",
    logo: "🟡",
    color: "#0050AA",
  },
  {
    id: "monoprix",
    name: "Monoprix",
    logo: "🔴",
    color: "#E4002B",
  },
  {
    id: "auchan",
    name: "Auchan",
    logo: "🔴",
    color: "#E30613",
  },
  {
    id: "leclerc",
    name: "E.Leclerc",
    logo: "🔵",
    color: "#005BAC",
  },
];

// Prix des produits par magasin (données simulées)
export const productPrices: ProductPrice[] = [
  // Pâtes Panzani
  { productId: "pates-panzani-500g", storeId: "carrefour", price: 1.45, available: true },
  { productId: "pates-panzani-500g", storeId: "lidl", price: 1.29, available: true },
  { productId: "pates-panzani-500g", storeId: "monoprix", price: 1.75, available: true },
  { productId: "pates-panzani-500g", storeId: "auchan", price: 1.39, available: true },
  { productId: "pates-panzani-500g", storeId: "leclerc", price: 1.35, available: true },

  // Pâtes Barilla
  { productId: "pates-barilla-500g", storeId: "carrefour", price: 1.65, available: true },
  { productId: "pates-barilla-500g", storeId: "lidl", price: 1.49, available: true },
  { productId: "pates-barilla-500g", storeId: "monoprix", price: 1.89, available: true },
  { productId: "pates-barilla-500g", storeId: "auchan", price: 1.55, available: true },
  { productId: "pates-barilla-500g", storeId: "leclerc", price: 1.52, available: true },

  // Pâtes Lustucru
  { productId: "pates-lustucru-500g", storeId: "carrefour", price: 1.25, available: true },
  { productId: "pates-lustucru-500g", storeId: "lidl", price: 1.19, available: true },
  { productId: "pates-lustucru-500g", storeId: "monoprix", price: 1.49, available: true },
  { productId: "pates-lustucru-500g", storeId: "auchan", price: 1.22, available: true },
  { productId: "pates-lustucru-500g", storeId: "leclerc", price: 1.20, available: true },

  // Café Carte Noire
  { productId: "cafe-carte-noire-250g", storeId: "carrefour", price: 4.89, available: true },
  { productId: "cafe-carte-noire-250g", storeId: "lidl", price: 4.49, available: true },
  { productId: "cafe-carte-noire-250g", storeId: "monoprix", price: 5.29, available: true },
  { productId: "cafe-carte-noire-250g", storeId: "auchan", price: 4.75, available: true },
  { productId: "cafe-carte-noire-250g", storeId: "leclerc", price: 4.59, available: true },

  // Café Lavazza
  { productId: "cafe-lavazza-250g", storeId: "carrefour", price: 5.49, available: true },
  { productId: "cafe-lavazza-250g", storeId: "lidl", price: 4.99, available: true },
  { productId: "cafe-lavazza-250g", storeId: "monoprix", price: 5.89, available: true },
  { productId: "cafe-lavazza-250g", storeId: "auchan", price: 5.29, available: true },
  { productId: "cafe-lavazza-250g", storeId: "leclerc", price: 5.15, available: true },

  // Café Nescafé
  { productId: "cafe-nescafe-200g", storeId: "carrefour", price: 7.99, available: true },
  { productId: "cafe-nescafe-200g", storeId: "lidl", price: 7.49, available: false },
  { productId: "cafe-nescafe-200g", storeId: "monoprix", price: 8.49, available: true },
  { productId: "cafe-nescafe-200g", storeId: "auchan", price: 7.79, available: true },
  { productId: "cafe-nescafe-200g", storeId: "leclerc", price: 7.65, available: true },

  // Chocolat Milka
  { productId: "chocolat-milka-100g", storeId: "carrefour", price: 1.89, available: true },
  { productId: "chocolat-milka-100g", storeId: "lidl", price: 1.59, available: true },
  { productId: "chocolat-milka-100g", storeId: "monoprix", price: 2.15, available: true },
  { productId: "chocolat-milka-100g", storeId: "auchan", price: 1.79, available: true },
  { productId: "chocolat-milka-100g", storeId: "leclerc", price: 1.69, available: true },

  // Chocolat Lindt
  { productId: "chocolat-lindt-100g", storeId: "carrefour", price: 2.49, available: true },
  { productId: "chocolat-lindt-100g", storeId: "lidl", price: 2.29, available: false },
  { productId: "chocolat-lindt-100g", storeId: "monoprix", price: 2.79, available: true },
  { productId: "chocolat-lindt-100g", storeId: "auchan", price: 2.39, available: true },
  { productId: "chocolat-lindt-100g", storeId: "leclerc", price: 2.35, available: true },

  // Chocolat Côte d'Or
  { productId: "chocolat-cote-dor-200g", storeId: "carrefour", price: 3.29, available: true },
  { productId: "chocolat-cote-dor-200g", storeId: "lidl", price: 2.99, available: true },
  { productId: "chocolat-cote-dor-200g", storeId: "monoprix", price: 3.69, available: true },
  { productId: "chocolat-cote-dor-200g", storeId: "auchan", price: 3.15, available: true },
  { productId: "chocolat-cote-dor-200g", storeId: "leclerc", price: 3.09, available: true },

  // Coca-Cola
  { productId: "coca-cola-1.5l", storeId: "carrefour", price: 1.99, available: true },
  { productId: "coca-cola-1.5l", storeId: "lidl", price: 1.79, available: true },
  { productId: "coca-cola-1.5l", storeId: "monoprix", price: 2.29, available: true },
  { productId: "coca-cola-1.5l", storeId: "auchan", price: 1.89, available: true },
  { productId: "coca-cola-1.5l", storeId: "leclerc", price: 1.85, available: true },

  // Evian
  { productId: "evian-1.5l", storeId: "carrefour", price: 0.89, available: true },
  { productId: "evian-1.5l", storeId: "lidl", price: 0.79, available: true },
  { productId: "evian-1.5l", storeId: "monoprix", price: 1.09, available: true },
  { productId: "evian-1.5l", storeId: "auchan", price: 0.85, available: true },
  { productId: "evian-1.5l", storeId: "leclerc", price: 0.82, available: true },

  // Orangina
  { productId: "orangina-1.5l", storeId: "carrefour", price: 2.15, available: true },
  { productId: "orangina-1.5l", storeId: "lidl", price: 1.95, available: true },
  { productId: "orangina-1.5l", storeId: "monoprix", price: 2.45, available: true },
  { productId: "orangina-1.5l", storeId: "auchan", price: 2.05, available: true },
  { productId: "orangina-1.5l", storeId: "leclerc", price: 1.99, available: true },

  // Lait Lactel
  { productId: "lait-lactel-1l", storeId: "carrefour", price: 1.15, available: true },
  { productId: "lait-lactel-1l", storeId: "lidl", price: 0.99, available: true },
  { productId: "lait-lactel-1l", storeId: "monoprix", price: 1.35, available: true },
  { productId: "lait-lactel-1l", storeId: "auchan", price: 1.09, available: true },
  { productId: "lait-lactel-1l", storeId: "leclerc", price: 1.05, available: true },

  // Yaourt Danone
  { productId: "yaourt-danone-4x125g", storeId: "carrefour", price: 1.79, available: true },
  { productId: "yaourt-danone-4x125g", storeId: "lidl", price: 1.59, available: true },
  { productId: "yaourt-danone-4x125g", storeId: "monoprix", price: 2.05, available: true },
  { productId: "yaourt-danone-4x125g", storeId: "auchan", price: 1.69, available: true },
  { productId: "yaourt-danone-4x125g", storeId: "leclerc", price: 1.65, available: true },

  // Beurre Président
  { productId: "beurre-president-250g", storeId: "carrefour", price: 2.89, available: true },
  { productId: "beurre-president-250g", storeId: "lidl", price: 2.59, available: true },
  { productId: "beurre-president-250g", storeId: "monoprix", price: 3.19, available: true },
  { productId: "beurre-president-250g", storeId: "auchan", price: 2.75, available: true },
  { productId: "beurre-president-250g", storeId: "leclerc", price: 2.69, available: true },

  // Céréales Kellogg's
  { productId: "cereales-kellogs-375g", storeId: "carrefour", price: 3.49, available: true },
  { productId: "cereales-kellogs-375g", storeId: "lidl", price: 3.19, available: true },
  { productId: "cereales-kellogs-375g", storeId: "monoprix", price: 3.89, available: true },
  { productId: "cereales-kellogs-375g", storeId: "auchan", price: 3.35, available: true },
  { productId: "cereales-kellogs-375g", storeId: "leclerc", price: 3.29, available: true },

  // Céréales Nestlé
  { productId: "cereales-nestle-450g", storeId: "carrefour", price: 3.99, available: true },
  { productId: "cereales-nestle-450g", storeId: "lidl", price: 3.69, available: true },
  { productId: "cereales-nestle-450g", storeId: "monoprix", price: 4.29, available: true },
  { productId: "cereales-nestle-450g", storeId: "auchan", price: 3.85, available: true },
  { productId: "cereales-nestle-450g", storeId: "leclerc", price: 3.79, available: true },
];
