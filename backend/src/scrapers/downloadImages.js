/**
 * Script pour télécharger toutes les images des produits
 * et mettre à jour la base de données avec les chemins locaux
 *
 * Usage: npm run images:download
 */
import { initDb, productQueries } from "../db/database.js";
import { downloadAllImages, updateImageUrls } from "../utils/imageDownloader.js";

async function main() {
  console.log("🖼️  Starting image download process...\n");

  // Initialiser la base de données
  initDb();

  // Récupérer tous les produits
  const products = productQueries.getAll.all();
  console.log(`Found ${products.length} products in database\n`);

  if (products.length === 0) {
    console.log("⚠️  No products found. Run 'npm run db:seed' first.");
    process.exit(0);
  }

  // Télécharger toutes les images
  const imageMap = await downloadAllImages(products);

  // Mettre à jour les URLs dans la base de données
  if (imageMap.size > 0) {
    updateImageUrls(imageMap, productQueries);
    console.log("✅ Image download complete!");
  } else {
    console.log("⚠️  No images were downloaded.");
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
