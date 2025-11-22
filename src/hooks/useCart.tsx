"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { StoreCluster, ProductWithPrice } from "@/types";
import { products } from "@/data/products";
import { stores, productPrices } from "@/data/stores";

interface CartContextType {
  selectedProducts: string[];
  toggleProduct: (productId: string) => void;
  clearCart: () => void;
  getStoreClusters: () => StoreCluster[];
  selectedCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const clearCart = () => {
    setSelectedProducts([]);
  };

  const getStoreClusters = (): StoreCluster[] => {
    if (selectedProducts.length === 0) return [];

    // Pour chaque produit sélectionné, trouver le prix le moins cher
    const cheapestPrices: Record<string, number> = {};
    selectedProducts.forEach((productId) => {
      const prices = productPrices
        .filter((pp) => pp.productId === productId && pp.available)
        .map((pp) => pp.price);
      if (prices.length > 0) {
        cheapestPrices[productId] = Math.min(...prices);
      }
    });

    // Créer les clusters pour chaque magasin
    const clusters: StoreCluster[] = stores.map((store) => {
      const storeProducts: ProductWithPrice[] = selectedProducts.map(
        (productId) => {
          const product = products.find((p) => p.id === productId)!;
          const priceInfo = productPrices.find(
            (pp) => pp.productId === productId && pp.storeId === store.id
          );

          return {
            ...product,
            price: priceInfo?.price ?? 0,
            available: priceInfo?.available ?? false,
            isCheapest: priceInfo?.price === cheapestPrices[productId],
          };
        }
      );

      const totalPrice = storeProducts
        .filter((p) => p.available)
        .reduce((sum, p) => sum + p.price, 0);

      return {
        store,
        products: storeProducts,
        totalPrice,
        savings: 0, // Sera calculé après
      };
    });

    // Calculer les économies par rapport au magasin le plus cher
    const maxTotal = Math.max(...clusters.map((c) => c.totalPrice));
    clusters.forEach((cluster) => {
      cluster.savings = maxTotal - cluster.totalPrice;
    });

    // Trier par prix total (moins cher en premier)
    return clusters.sort((a, b) => a.totalPrice - b.totalPrice);
  };

  return (
    <CartContext.Provider
      value={{
        selectedProducts,
        toggleProduct,
        clearCart,
        getStoreClusters,
        selectedCount: selectedProducts.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
