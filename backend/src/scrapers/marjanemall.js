import { BaseScraper } from "./base.js";

/**
 * Scraper pour MarjaneMall.ma
 *
 * MarjaneMall est la plateforme e-commerce de Marjane
 */
export class MarjaneMallScraper extends BaseScraper {
  constructor() {
    super("marjanemall", "Marjane Mall", "https://www.marjanemall.ma");
  }

  /**
   * Recherche des produits sur Marjane Mall
   */
  async search(searchTerm) {
    try {
      const searchUrl = `${this.baseUrl}/catalogsearch/result/?q=${encodeURIComponent(searchTerm)}`;

      const html = await this.fetch(searchUrl);
      if (!html) return [];

      const $ = this.parseHtml(html);
      const products = [];

      // Sélecteurs pour Marjane Mall (à adapter selon la structure réelle)
      $('.product-item, .product, .item, [class*="product-card"]').each((index, element) => {
        try {
          const $el = $(element);

          const name = $el.find('.product-name, .product-item-name, h2, h3').first().text().trim();
          const priceText = $el.find('.price, .product-price, [class*="price"]').first().text().trim();
          const price = this.cleanPrice(priceText);

          const brand = $el.find('.product-brand, .brand').text().trim() ||
                       this.extractBrand(name);

          const unit = $el.find('.product-unit, .unit').text().trim();
          const productUrl = $el.find('a').first().attr('href') || '';

          const imageUrl = $el.find('img').first().attr('src') ||
                          $el.find('img').first().attr('data-src') ||
                          $el.find('img').first().attr('data-lazy');

          if (name && price !== null) {
            products.push({
              name,
              brand,
              price,
              unit,
              available: true,
              url: productUrl.startsWith('http') ? productUrl : `${this.baseUrl}${productUrl}`,
              image_url: imageUrl,
              store_id: this.storeId,
            });
          }
        } catch (err) {
          // Ignorer les erreurs de parsing individuelles
        }
      });

      console.log(`[Marjane Mall] Found ${products.length} products for "${searchTerm}"`);
      return products;
    } catch (error) {
      console.error("[Marjane Mall] Search error:", error.message);
      return [];
    }
  }

  /**
   * Extrait la marque du nom du produit
   */
  extractBrand(productName) {
    const brands = [
      "Panzani", "Barilla", "Centrale", "Aiguebelle", "Cosumar", "Lesieur",
      "Danone", "Centrale Danone", "Jaouda", "Al Andaloussia", "Milka",
      "Carte Noire", "Nescafé", "Coca-Cola", "Fanta", "Sprite", "Hawai",
      "Chergui", "Dounia", "Marjane"
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

      const name = $('.product-name, h1.page-title').first().text().trim();
      const priceText = $('.price, .product-price').first().text().trim();
      const price = this.cleanPrice(priceText);
      const brand = $('.brand, .product-brand').text().trim();
      const unit = $('.unit, .product-unit').text().trim();
      const imageUrl = $('.product-image-photo, .gallery-image img').first().attr('src');

      return {
        name,
        brand: brand || this.extractBrand(name),
        price,
        unit,
        available: price !== null,
        image_url: imageUrl,
        store_id: this.storeId,
      };
    } catch (error) {
      console.error("[Marjane Mall] Product details error:", error.message);
      return null;
    }
  }
}

export default MarjaneMallScraper;
