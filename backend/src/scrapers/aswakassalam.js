import { BaseScraper } from "./base.js";

/**
 * Scraper pour AswakAssalam.com
 *
 * Aswak Assalam est une chaîne de supermarchés marocaine
 */
export class AswakAssalamScraper extends BaseScraper {
  constructor() {
    super("aswakassalam", "Aswak Assalam", "https://aswakassalam.com");
  }

  /**
   * Recherche des produits sur Aswak Assalam
   */
  async search(searchTerm) {
    try {
      const searchUrl = `${this.baseUrl}/search?q=${encodeURIComponent(searchTerm)}`;

      const html = await this.fetch(searchUrl);
      if (!html) return [];

      const $ = this.parseHtml(html);
      const products = [];

      // Sélecteurs pour Aswak Assalam (à adapter selon la structure réelle)
      $('.product, .product-item, .item, [class*="product"]').each((index, element) => {
        try {
          const $el = $(element);

          const name = $el.find('.product-name, .product-title, h2, h3').first().text().trim();
          const priceText = $el.find('.price, [class*="price"]').first().text().trim();
          const price = this.cleanPrice(priceText);

          const brand = $el.find('.brand, .product-brand').text().trim() ||
                       this.extractBrand(name);

          const unit = $el.find('.unit, .weight').text().trim();
          const productUrl = $el.find('a').first().attr('href') || '';

          const imageUrl = $el.find('img').first().attr('src') ||
                          $el.find('img').first().attr('data-src') ||
                          $el.find('img').first().attr('data-lazy-src');

          if (name && price !== null) {
            products.push({
              name,
              brand,
              price,
              unit,
              available: true,
              url: productUrl.startsWith('http') ? productUrl : `${this.baseUrl}${productUrl}`,
              image_url: imageUrl && imageUrl.startsWith('http') ? imageUrl :
                        imageUrl ? `${this.baseUrl}${imageUrl}` : null,
              store_id: this.storeId,
            });
          }
        } catch (err) {
          // Ignorer les erreurs de parsing individuelles
        }
      });

      console.log(`[Aswak Assalam] Found ${products.length} products for "${searchTerm}"`);
      return products;
    } catch (error) {
      console.error("[Aswak Assalam] Search error:", error.message);
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
      "Chergui", "Dounia", "Assalam"
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

      const name = $('h1, .product-name').first().text().trim();
      const priceText = $('.price, .product-price').first().text().trim();
      const price = this.cleanPrice(priceText);
      const brand = $('.brand, .product-brand').text().trim();
      const unit = $('.unit, .product-unit').text().trim();
      const imageUrl = $('.product-image img, .product-img').first().attr('src');

      return {
        name,
        brand: brand || this.extractBrand(name),
        price,
        unit,
        available: price !== null,
        image_url: imageUrl && imageUrl.startsWith('http') ? imageUrl :
                  imageUrl ? `${this.baseUrl}${imageUrl}` : null,
        store_id: this.storeId,
      };
    } catch (error) {
      console.error("[Aswak Assalam] Product details error:", error.message);
      return null;
    }
  }
}

export default AswakAssalamScraper;
