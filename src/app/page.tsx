"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProductCard, CategoryFilter } from "@/components";
import { useCart } from "@/hooks/useCart";
import { getProducts, Product } from "@/services/api";

const categories = [
  "Tous",
  "Pâtes",
  "Café",
  "Chocolat",
  "Boissons",
  "Produits laitiers",
  "Céréales",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedCount } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Impossible de charger les produits. Vérifiez que le backend est démarré.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Comparez les prix,{" "}
          <span className="text-green-400">économisez plus</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Sélectionnez vos produits et découvrez dans quel magasin faire vos
          courses pour payer moins cher.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-8 text-center"
        >
          <p className="text-red-400">{error}</p>
          <p className="text-white/50 text-sm mt-2">
            Lancez le backend avec: <code className="bg-white/10 px-2 py-1 rounded">cd backend && npm run start</code>
          </p>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !error && (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  brand: product.brand,
                  category: product.category,
                  image: product.image_url || "📦",
                  unit: product.unit,
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/50">Aucun produit trouvé dans cette catégorie.</p>
        </div>
      )}

      {/* Floating Action Button */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2"
          >
            <Link href="/compare">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-green-500/30 flex items-center gap-3"
              >
                <span>Comparer les prix</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {selectedCount} produit{selectedCount > 1 ? "s" : ""}
                </span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
