"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";

export default function Header() {
  const pathname = usePathname();
  const { selectedCount, clearCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <span className="text-xl font-bold text-white">Reglo</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Produits
            </Link>
            <Link
              href="/compare"
              className={`relative text-sm font-medium transition-colors ${
                pathname === "/compare"
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Comparer
              {selectedCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-4 w-5 h-5 bg-green-500 rounded-full text-xs flex items-center justify-center text-white"
                >
                  {selectedCount}
                </motion.span>
              )}
            </Link>
          </nav>

          {selectedCount > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={clearCart}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Effacer
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
