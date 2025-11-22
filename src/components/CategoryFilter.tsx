"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all
            ${
              selectedCategory === category
                ? "bg-white text-black"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }
          `}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
