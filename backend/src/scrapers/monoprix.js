import { BaseScraper } from "./base.js";

/**
 * Scraper pour Monoprix.fr
 */
export class MonoprixScraper extends BaseScraper {
  constructor() {
    super("monoprix", "Monoprix", "https://www.monoprix.fr");
  }

  async search(searchTerm) {
    try {
      const searchUrl = `${this.baseUrl}/recherche?q=${encodeURIComponent(searchTerm)}`;

      const html = await this.fetch(searchUrl);
      if (!html) return [];

      const $ = this.parseHtml(html);
      const products = [];

      $('[class*="product-card"], [class*="ProductCard"], article').each(
        (index, element) => {
          try {
            const $el = $(element);

            const name = $el
              .find('[class*="product-name"], [class*="title"], h2, h3')
              .first()
              .text()
              .trim();

            const priceText = $el
              .find('[class*="price"], [class*="Price"]')
              .first()
              .text()
              .trim();

            const price = this.cleanPrice(priceText);

            if (name && price !== null) {
              products.push({
                name,
                brand: this.extractBrand(name),
                price,
                unit: $el.find('[class*="weight"], [class*="unit"]').text().trim(),
                available: true,
                url: this.baseUrl,
                store_id: this.storeId,
              });
            }
          } catch (err) {}
        }
      );

      console.log(`[Monoprix] Found ${products.length} products for "${searchTerm}"`);
      return products;
    } catch (error) {
      console.error("[Monoprix] Search error:", error.message);
      return [];
    }
  }

  extractBrand(productName) {
    const brands = [
      "Panzani", "Barilla", "Lustucru", "Carte Noire", "Lavazza", "Nescafé",
      "Milka", "Lindt", "Côte d'Or", "Coca-Cola", "Evian", "Orangina",
      "Lactel", "Danone", "Président", "Kellogg's", "Nestlé", "Monoprix",
    ];

    for (const brand of brands) {
      if (productName.toLowerCase().includes(brand.toLowerCase())) {
        return brand;
      }
    }
    return "";
  }

  async getProductDetails(productUrl) {
    return null; // À implémenter selon la structure du site
  }
}

export default MonoprixScraper;
