import { BaseScraper } from "./base.js";

/**
 * Scraper pour Auchan.fr
 */
export class AuchanScraper extends BaseScraper {
  constructor() {
    super("auchan", "Auchan", "https://www.auchan.fr");
  }

  /**
   * Recherche des produits sur Auchan
   */
  async search(searchTerm) {
    try {
      const searchUrl = `${this.baseUrl}/recherche?text=${encodeURIComponent(searchTerm)}`;

      const html = await this.fetch(searchUrl);
      if (!html) return [];

      const $ = this.parseHtml(html);
      const products = [];

      // Sélecteurs pour les produits Auchan
      $(
        '[data-testid="product-card"], .product-card, .product-thumbnail, article[class*="product"]'
      ).each((index, element) => {
        try {
          const $el = $(element);

          const name =
            $el.find('[class*="product-title"], [class*="product-name"], h2, h3')
              .first()
              .text()
              .trim();

          const priceText =
            $el.find('[class*="product-price"], [class*="price"]').text().trim();

          const price = this.cleanPrice(priceText);

          const brand =
            $el.find('[class*="product-brand"]').text().trim() ||
            this.extractBrand(name);

          const unit = $el.find('[class*="product-weight"], [class*="product-unit"]').text().trim();

          const productUrl = $el.find("a").first().attr("href") || "";

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
      });

      console.log(`[Auchan] Found ${products.length} products for "${searchTerm}"`);
      return products;
    } catch (error) {
      console.error("[Auchan] Search error:", error.message);
      return [];
    }
  }

  extractBrand(productName) {
    const brands = [
      "Panzani", "Barilla", "Lustucru", "Carte Noire", "Lavazza", "Nescafé",
      "Milka", "Lindt", "Côte d'Or", "Coca-Cola", "Evian", "Orangina",
      "Lactel", "Danone", "Président", "Kellogg's", "Nestlé", "Auchan",
    ];

    for (const brand of brands) {
      if (productName.toLowerCase().includes(brand.toLowerCase())) {
        return brand;
      }
    }
    return "";
  }

  async getProductDetails(productUrl) {
    try {
      const html = await this.fetch(productUrl);
      if (!html) return null;

      const $ = this.parseHtml(html);

      const name = $("h1").first().text().trim();
      const priceText = $('[class*="product-price"], .price').first().text().trim();
      const price = this.cleanPrice(priceText);

      return {
        name,
        brand: this.extractBrand(name),
        price,
        unit: $('[class*="product-weight"]').text().trim(),
        available: price !== null,
        store_id: this.storeId,
      };
    } catch (error) {
      console.error("[Auchan] Product details error:", error.message);
      return null;
    }
  }
}

export default AuchanScraper;
