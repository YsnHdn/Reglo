import axios from "axios";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dossier pour sauvegarder les images
const IMAGES_DIR = join(__dirname, "../../public/images/products");

// Créer le dossier s'il n'existe pas
if (!existsSync(IMAGES_DIR)) {
  mkdirSync(IMAGES_DIR, { recursive: true });
}

/**
 * Télécharge une image depuis une URL et la sauvegarde localement
 * @param {string} imageUrl - URL de l'image
 * @param {string} productId - ID du produit (optionnel)
 * @returns {Promise<string>} - Chemin local de l'image sauvegardée
 */
export async function downloadImage(imageUrl, productId = null) {
  try {
    // Si c'est déjà un emoji ou chemin local, le retourner directement
    if (!imageUrl || !imageUrl.startsWith("http")) {
      return imageUrl;
    }

    // Générer un nom de fichier unique
    const hash = crypto.createHash("md5").update(imageUrl).digest("hex");
    const ext = imageUrl.split(".").pop()?.split("?")[0] || "jpg";
    const filename = productId ? `${productId}.${ext}` : `${hash}.${ext}`;
    const filepath = join(IMAGES_DIR, filename);

    // Si l'image existe déjà, retourner le chemin
    if (existsSync(filepath)) {
      return `/images/products/${filename}`;
    }

    // Télécharger l'image
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      timeout: 10000,
    });

    // Sauvegarder l'image
    writeFileSync(filepath, response.data);
    console.log(`✓ Image downloaded: ${filename}`);

    return `/images/products/${filename}`;
  } catch (error) {
    console.error(`✗ Failed to download image: ${imageUrl}`, error.message);
    return null;
  }
}

/**
 * Télécharge toutes les images pour une liste de produits
 * @param {Array} products - Liste des produits avec image_url
 * @returns {Promise<Map>} - Map de productId -> chemin local
 */
export async function downloadAllImages(products) {
  const imageMap = new Map();

  console.log(`\n📷 Downloading ${products.length} product images...\n`);

  for (const product of products) {
    if (product.image_url) {
      const localPath = await downloadImage(product.image_url, product.id);
      if (localPath) {
        imageMap.set(product.id, localPath);
      }
      // Petit délai pour éviter de surcharger le serveur
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log(`\n✅ Downloaded ${imageMap.size}/${products.length} images\n`);
  return imageMap;
}

/**
 * Met à jour les URLs d'images dans la base de données
 * @param {Map} imageMap - Map de productId -> chemin local
 * @param {object} productQueries - Queries de la base de données
 */
export function updateImageUrls(imageMap, productQueries) {
  let updated = 0;

  for (const [productId, localPath] of imageMap) {
    try {
      const product = productQueries.getById.get(productId);
      if (product) {
        productQueries.insert.run(
          product.id,
          product.barcode,
          product.name,
          product.brand,
          product.category,
          localPath, // Nouveau chemin local
          product.unit
        );
        updated++;
      }
    } catch (error) {
      console.error(`Failed to update product ${productId}:`, error.message);
    }
  }

  console.log(`\n✅ Updated ${updated} product image URLs in database\n`);
}

export default {
  downloadImage,
  downloadAllImages,
  updateImageUrls,
};
