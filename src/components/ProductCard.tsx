"use client";

import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { selectedProducts, toggleProduct } = useCart();
  const isSelected = selectedProducts.includes(product.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => toggleProduct(product.id)}
      className={`
        relative cursor-pointer rounded-xl p-4 transition-all duration-200
        ${
          isSelected
            ? "bg-green-500/20 border-2 border-green-500 shadow-lg shadow-green-500/20"
            : "bg-white/5 border-2 border-white/10 hover:border-white/30"
        }
      `}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}

      <div className="text-4xl mb-3 text-center">{product.image}</div>

      <div className="space-y-1">
        <p className="text-xs text-white/50 uppercase tracking-wider">
          {product.brand}
        </p>
        <h3 className="font-semibold text-white text-sm leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-white/60">{product.unit}</p>
      </div>

      <div className="mt-2 pt-2 border-t border-white/10">
        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
          {product.category}
        </span>
      </div>
    </motion.div>
  );
}
