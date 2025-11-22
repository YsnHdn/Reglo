"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { StoreClusterCard } from "@/components";
import { useCart } from "@/hooks/useCart";

export default function ComparePage() {
  const { getStoreClusters, selectedCount, selectedProducts } = useCart();
  const clusters = getStoreClusters();

  if (selectedCount === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-6xl mb-6 block">🛒</span>
          <h1 className="text-3xl font-bold text-white mb-4">
            Votre panier est vide
          </h1>
          <p className="text-white/60 mb-8">
            Sélectionnez des produits pour comparer les prix dans différents
            magasins.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold"
            >
              Choisir des produits
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Calculer les économies potentielles
  const maxTotal = Math.max(...clusters.map((c) => c.totalPrice));
  const minTotal = Math.min(...clusters.map((c) => c.totalPrice));
  const potentialSavings = maxTotal - minTotal;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Comparaison des prix
        </h1>
        <p className="text-white/60">
          {selectedCount} produit{selectedCount > 1 ? "s" : ""} sélectionné
          {selectedCount > 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/50 rounded-2xl p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm mb-1">Économies potentielles</p>
            <p className="text-4xl font-bold text-green-400">
              {potentialSavings.toFixed(2)} €
            </p>
            <p className="text-white/50 text-sm mt-1">
              en choisissant le magasin le moins cher
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-white/60 text-sm">Moins cher</p>
              <p className="text-2xl font-bold text-white">
                {minTotal.toFixed(2)} €
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">Plus cher</p>
              <p className="text-2xl font-bold text-white/50">
                {maxTotal.toFixed(2)} €
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Store Clusters */}
      <div className="space-y-6">
        {clusters.map((cluster, index) => (
          <StoreClusterCard
            key={cluster.store.id}
            cluster={cluster}
            rank={index + 1}
          />
        ))}
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Link href="/">
          <button className="text-white/60 hover:text-white transition-colors">
            ← Modifier ma sélection
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
