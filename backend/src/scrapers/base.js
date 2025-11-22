import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Classe de base pour les scrapers de supermarchés
 * Chaque scraper spécifique doit étendre cette classe
 */
export class BaseScraper {
  constructor(storeId, storeName, baseUrl) {
    this.storeId = storeId;
    this.storeName = storeName;
    this.baseUrl = baseUrl;
    this.headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    };
    this.delay = 2000; // 2 secondes entre chaque requête
  }

  /**
   * Attend un certain temps (rate limiting)
   */
  async wait(ms = this.delay) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Fait une requête HTTP avec gestion des erreurs
   */
  async fetch(url, options = {}) {
    try {
      const response = await axios.get(url, {
        headers: this.headers,
        timeout: 30000,
        ...options,
      });
      return response.data;
    } catch (error) {
      console.error(`[${this.storeName}] Error fetching ${url}:`, error.message);
      return null;
    }
  }

  /**
   * Parse le HTML avec Cheerio
   */
  parseHtml(html) {
    return cheerio.load(html);
  }

  /**
   * Nettoie un prix (string vers number)
   */
  cleanPrice(priceString) {
    if (!priceString) return null;
    // Remplacer la virgule par un point et supprimer tout sauf les chiffres et le point
    const cleaned = priceString
      .replace(",", ".")
      .replace(/[^\d.]/g, "");
    const price = parseFloat(cleaned);
    return isNaN(price) ? null : price;
  }

  /**
   * Méthode à implémenter par chaque scraper
   * @param {string} searchTerm - Terme de recherche
   * @returns {Array<{name, brand, price, unit, available, url}>}
   */
  async search(searchTerm) {
    throw new Error("search() must be implemented by subclass");
  }

  /**
   * Méthode à implémenter par chaque scraper
   * @param {string} productUrl - URL du produit
   * @returns {{name, brand, price, unit, available, barcode}}
   */
  async getProductDetails(productUrl) {
    throw new Error("getProductDetails() must be implemented by subclass");
  }

  /**
   * Recherche un produit et retourne ses infos
   */
  async searchProduct(productName) {
    console.log(`[${this.storeName}] Searching for: ${productName}`);
    const results = await this.search(productName);
    await this.wait();
    return results;
  }
}

export default BaseScraper;
