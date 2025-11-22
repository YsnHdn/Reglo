"use client";

import { motion } from "framer-motion";
import { StoreCluster } from "@/types";

interface StoreClusterCardProps {
  cluster: StoreCluster;
  rank: number;
}

export default function StoreClusterCard({
  cluster,
  rank,
}: StoreClusterCardProps) {
  const isBestDeal = rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={`
        relative rounded-2xl overflow-hidden
        ${
          isBestDeal
            ? "bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500"
            : "bg-white/5 border border-white/10"
        }
      `}
    >
      {isBestDeal && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1 text-sm font-semibold">
          Meilleur prix
        </div>
      )}

      <div className={`p-6 ${isBestDeal ? "pt-10" : ""}`}>
        {/* En-tête du magasin */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{cluster.store.logo}</span>
            <div>
              <h3 className="text-xl font-bold text-white">
                {cluster.store.name}
              </h3>
              <p className="text-sm text-white/50">
                {cluster.products.filter((p) => p.available).length}/
                {cluster.products.length} produits disponibles
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-white">
              {cluster.totalPrice.toFixed(2)}
            </p>
            {cluster.savings > 0 && (
              <p className="text-sm text-green-400">
                -{cluster.savings.toFixed(2)} vs max
              </p>
            )}
          </div>
        </div>

        {/* Liste des produits */}
        <div className="space-y-2">
          {cluster.products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                flex items-center justify-between p-3 rounded-lg
                ${
                  product.isCheapest && product.available
                    ? "bg-green-500/20 border border-green-500/50"
                    : product.available
                    ? "bg-white/5"
                    : "bg-red-500/10 opacity-50"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{product.image}</span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {product.brand} - {product.name}
                  </p>
                  <p className="text-xs text-white/50">{product.unit}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {product.isCheapest && product.available && (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">
                    Moins cher
                  </span>
                )}
                {!product.available ? (
                  <span className="text-sm text-red-400">Indisponible</span>
                ) : (
                  <span className="text-lg font-semibold text-white">
                    {product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
