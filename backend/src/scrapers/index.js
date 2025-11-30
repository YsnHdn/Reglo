import { CarrefourScraper } from "./carrefour.js";
import { AuchanScraper } from "./auchan.js";
import { MonoprixScraper } from "./monoprix.js";
import { MarjaneScraper } from "./marjane.js";
import { MarjaneMallScraper } from "./marjanemall.js";
import { AswakAssalamScraper } from "./aswakassalam.js";

// Export all scrapers
export const scrapers = {
  // French stores
  carrefour: new CarrefourScraper(),
  auchan: new AuchanScraper(),
  monoprix: new MonoprixScraper(),
  // Moroccan stores
  marjane: new MarjaneScraper(),
  marjanemall: new MarjaneMallScraper(),
  aswakassalam: new AswakAssalamScraper(),
};

/**
 * Recherche un produit sur tous les magasins
 * @param {string} searchTerm - Terme de recherche
 * @returns {Promise<Array>} Résultats de tous les magasins
 */
export async function searchAllStores(searchTerm) {
  const results = [];

  for (const [storeId, scraper] of Object.entries(scrapers)) {
    try {
      const products = await scraper.searchProduct(searchTerm);
      results.push({
        store: storeId,
        products,
      });
    } catch (error) {
      console.error(`Error searching ${storeId}:`, error.message);
      results.push({
        store: storeId,
        products: [],
        error: error.message,
      });
    }
  }

  return results;
}

/**
 * Recherche un produit sur un magasin spécifique
 * @param {string} storeId - ID du magasin
 * @param {string} searchTerm - Terme de recherche
 */
export async function searchStore(storeId, searchTerm) {
  const scraper = scrapers[storeId];
  if (!scraper) {
    throw new Error(`Unknown store: ${storeId}`);
  }

  return scraper.searchProduct(searchTerm);
}

export default scrapers;
