"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProductCard, CategoryFilter } from "@/components";
import { products, categories } from "@/data/products";
import { useCart } from "@/hooks/useCart";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const { selectedCount } = useCart();

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

      {/* Products Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

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
