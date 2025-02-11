"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CategoryContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Kategori seçimi her değiştiğinde localStorage'a kaydedin
  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    } else {
      setSelectedCategory("Kahvaltılık");
    }
  }, []);

  const updateSelectedCategory = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      localStorage.setItem("selectedCategory", category);
    } else {
      localStorage.removeItem("selectedCategory");
    }
  };

  return (
    <CategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory: updateSelectedCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Context Hook
export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
