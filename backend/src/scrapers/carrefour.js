import { BaseScraper } from "./base.js";

/**
 * Scraper pour Carrefour.fr
 *
 * Note: Carrefour utilise une API interne pour les recherches.
 * Cette implémentation utilise leur API publique de recherche.
 */
export class CarrefourScraper extends BaseScraper {
  constructor() {
    super("carrefour", "Carrefour", "https://www.carrefour.fr");
    this.apiBase = "https://www.carrefour.fr/api";
    this.searchEndpoint = "/search";
  }

  /**
   * Recherche des produits sur Carrefour
   * Utilise l'API de recherche de Carrefour
   */
  async search(searchTerm) {
    try {
      // Carrefour utilise une API GraphQL/REST pour la recherche
      // On simule une recherche via leur endpoint de recherche
      const searchUrl = `${this.baseUrl}/s?q=${encodeURIComponent(searchTerm)}`;

      const html = await this.fetch(searchUrl);
      if (!html) return [];

      const $ = this.parseHtml(html);
      const products = [];

      // Sélecteurs pour les produits Carrefour (peuvent changer)
      // Note: Ces sélecteurs doivent être mis à jour si le site change
      $('[data-testid="product-card"], .product-card, .product-item').each(
        (index, element) => {
          try {
            const $el = $(element);

            // Extraire les informations du produit
            const name =
              $el.find('[data-testid="product-title"], .product-card-title, .product-name').text().trim() ||
              $el.find("h2, h3").first().text().trim();

            const priceText =
              $el.find('[data-testid="product-price"], .product-price, .price').text().trim();

            const price = this.cleanPrice(priceText);

            const brand =
              $el.find('[data-testid="product-brand"], .product-brand').text().trim() ||
              this.extractBrand(name);

            const unit =
              $el.find('[data-testid="product-weight"], .product-weight, .product-unit').text().trim();

            const productUrl =
              $el.find("a").first().attr("href") || "";

            const imageUrl =
              $el.find("img").first().attr("src") ||
              $el.find("img").first().attr("data-src");

            if (name && price !== null) {
              products.push({
                name,
                brand,
                price,
                unit,
                available: true,
                url: productUrl.startsWith("http")
                  ? productUrl
                  : `${this.baseUrl}${productUrl}`,
                image_url: imageUrl,
                store_id: this.storeId,
              });
            }
          } catch (err) {
            // Ignorer les erreurs de parsing individuelles
          }
        }
      );

      console.log(`[Carrefour] Found ${products.length} products for "${searchTerm}"`);
      return products;
    } catch (error) {
      console.error("[Carrefour] Search error:", error.message);
      return [];
    }
  }

  /**
   * Extrait la marque du nom du produit si elle n'est pas fournie séparément
   */
  extractBrand(productName) {
    // Liste des marques courantes
    const brands = [
      "Panzani", "Barilla", "Lustucru", "Carte Noire", "Lavazza", "Nescafé",
      "Milka", "Lindt", "Côte d'Or", "Coca-Cola", "Evian", "Orangina",
      "Lactel", "Danone", "Président", "Kellogg's", "Nestlé", "Carrefour",
    ];

    for (const brand of brands) {
      if (productName.toLowerCase().includes(brand.toLowerCase())) {
        return brand;
      }
    }
    return "";
  }

  /**
   * Récupère les détails d'un produit spécifique
   */
  async getProductDetails(productUrl) {
    try {
      const html = await this.fetch(productUrl);
      if (!html) return null;

      const $ = this.parseHtml(html);

      // Extraire les informations détaillées
      const name = $('h1[data-testid="product-title"], h1.product-title').text().trim();
      const priceText = $('[data-testid="product-price"], .product-price').text().trim();
      const price = this.cleanPrice(priceText);
      const brand = $('[data-testid="product-brand"], .product-brand').text().trim();
      const unit = $('[data-testid="product-weight"], .product-weight').text().trim();
      const barcode = $('[data-testid="product-ean"], .product-ean').text().trim();
      const imageUrl = $('img[data-testid="product-image"], .product-image img').attr("src");

      return {
        name,
        brand: brand || this.extractBrand(name),
        price,
        unit,
        available: price !== null,
        barcode,
        image_url: imageUrl,
        store_id: this.storeId,
      };
    } catch (error) {
      console.error("[Carrefour] Product details error:", error.message);
      return null;
    }
  }
}

export default CarrefourScraper;
