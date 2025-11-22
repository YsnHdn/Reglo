"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { compareProducts, ComparisonResult, StoreCluster } from "@/services/api";

interface CartContextType {
  selectedProducts: string[];
  toggleProduct: (productId: string) => void;
  clearCart: () => void;
  fetchComparison: () => Promise<ComparisonResult | null>;
  selectedCount: number;
  isLoading: boolean;
  comparison: ComparisonResult | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  const toggleProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    // Reset comparison when selection changes
    setComparison(null);
  }, []);

  const clearCart = useCallback(() => {
    setSelectedProducts([]);
    setComparison(null);
  }, []);

  const fetchComparison = useCallback(async (): Promise<ComparisonResult | null> => {
    if (selectedProducts.length === 0) {
      setComparison(null);
      return null;
    }

    setIsLoading(true);
    try {
      const result = await compareProducts(selectedProducts);
      setComparison(result);
      return result;
    } catch (error) {
      console.error("Error fetching comparison:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [selectedProducts]);

  return (
    <CartContext.Provider
      value={{
        selectedProducts,
        toggleProduct,
        clearCart,
        fetchComparison,
        selectedCount: selectedProducts.length,
        isLoading,
        comparison,
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
