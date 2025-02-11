"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCategory } from "./CategoryContext";

const Categories = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  const categories = [
    "Kahvaltılık",
    "Çorba",
    "Ana Yemek",
    "Tatlı",
    "Atıştırmalık",
    "İçecek",
    "Salata",
    "Fast Food",
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-foreground">
        Kategoriler
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? "ghost" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="px-4 py-2 text-sm bg-card text-card-foreground hover:bg-muted hover:text-muted-foreground"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
