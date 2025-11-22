import axios from "axios";

const OFF_API_BASE = "https://world.openfoodfacts.org";
const OFF_API_FR = "https://fr.openfoodfacts.org";

// User agent requis par Open Food Facts
const headers = {
  "User-Agent": "Reglo - Price Comparison App - contact@reglo.app",
};

/**
 * Recherche des produits sur Open Food Facts
 * @param {string} query - Terme de recherche
 * @param {number} page - Numéro de page (défaut: 1)
 * @param {number} pageSize - Nombre de résultats par page (défaut: 20)
 */
export async function searchOpenFoodFacts(query, page = 1, pageSize = 20) {
  try {
    const response = await axios.get(`${OFF_API_FR}/cgi/search.pl`, {
      headers,
      params: {
        search_terms: query,
        search_simple: 1,
        action: "process",
        json: 1,
        page,
        page_size: pageSize,
        // Filtrer uniquement les produits vendus en France
        tagtype_0: "countries",
        tag_contains_0: "contains",
        tag_0: "france",
      },
    });

    const products = response.data.products || [];

    return products.map(formatProduct);
  } catch (error) {
    console.error("Error searching Open Food Facts:", error.message);
    return [];
  }
}

/**
 * Récupère un produit par son code-barres
 * @param {string} barcode - Code-barres EAN
 */
export async function getProductByBarcode(barcode) {
  try {
    const response = await axios.get(
      `${OFF_API_BASE}/api/v2/product/${barcode}.json`,
      { headers }
    );

    if (response.data.status === 0) {
      return null;
    }

    return formatProduct(response.data.product);
  } catch (error) {
    console.error("Error fetching product from Open Food Facts:", error.message);
    return null;
  }
}

/**
 * Recherche des produits par catégorie
 * @param {string} category - Catégorie (ex: "pates", "cafe", "chocolats")
 */
export async function getProductsByCategory(category, page = 1) {
  try {
    const response = await axios.get(
      `${OFF_API_FR}/category/${category}.json`,
      {
        headers,
        params: {
          page,
          page_size: 50,
          // Filtrer par France
          tagtype_0: "countries",
          tag_contains_0: "contains",
          tag_0: "france",
        },
      }
    );

    const products = response.data.products || [];
    return products.map(formatProduct);
  } catch (error) {
    console.error("Error fetching category from Open Food Facts:", error.message);
    return [];
  }
}

/**
 * Formate un produit Open Food Facts vers notre format
 */
function formatProduct(product) {
  // Déterminer la catégorie principale
  const categories = product.categories_tags || [];
  let category = "Autres";

  if (categories.some((c) => c.includes("pates") || c.includes("pasta"))) {
    category = "Pâtes";
  } else if (categories.some((c) => c.includes("cafe") || c.includes("coffee"))) {
    category = "Café";
  } else if (categories.some((c) => c.includes("chocolat") || c.includes("chocolate"))) {
    category = "Chocolat";
  } else if (categories.some((c) => c.includes("boisson") || c.includes("beverage"))) {
    category = "Boissons";
  } else if (categories.some((c) => c.includes("lait") || c.includes("dairy") || c.includes("yaourt"))) {
    category = "Produits laitiers";
  } else if (categories.some((c) => c.includes("cereal"))) {
    category = "Céréales";
  }

  // Générer un ID unique basé sur le code-barres
  const id = product.code || product._id || `off-${Date.now()}`;

  return {
    id,
    barcode: product.code,
    name: product.product_name || product.product_name_fr || "Produit inconnu",
    brand: product.brands || "Marque inconnue",
    category,
    image_url: product.image_front_small_url || product.image_url || null,
    unit: product.quantity || "",
    // Données supplémentaires
    nutriscore: product.nutriscore_grade,
    ecoscore: product.ecoscore_grade,
    ingredients: product.ingredients_text_fr || product.ingredients_text,
  };
}

export default {
  searchOpenFoodFacts,
  getProductByBarcode,
  getProductsByCategory,
};
