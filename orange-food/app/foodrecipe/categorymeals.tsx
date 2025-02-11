"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCategory } from "./CategoryContext";

interface Recipe {
  ingredients: string[];
  instructions: string;
}

interface Meal {
  id: number;
  name: string;
  image: string;
  recipe: Recipe;
}

interface Meals {
  [category: string]: Meal[];
}

const CategoryMeals = () => {
  const { selectedCategory } = useCategory();
  const [meals, setMeals] = useState<Meals | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("/api/food-recipe-api");
        if (!response.ok) {
          throw new Error("Veriler yüklenirken bir hata oluştu.");
        }
        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const openDialog = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedMeal(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
          Yükleniyor...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
          Hata
        </h2>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (!selectedCategory) {
    return (
      <div className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
          Kategori Seçimi Yapılmadı
        </h2>
        <p className="text-center">
          Lütfen bir kategori seçerek tariflere göz atın.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
        {selectedCategory} Tarifleri
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals &&
          meals[selectedCategory]?.map((meal) => (
            <Card
              key={meal.id}
              className="bg-card text-card-foreground border border-border"
            >
              <CardHeader>
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold text-center mb-4">
                  {meal.name}
                </h3>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => openDialog(meal)}
                >
                  Tarif Detayları
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      {isDialogOpen && selectedMeal && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedMeal.name}</DialogTitle>
              <DialogDescription>
                <p>
                  <strong>Malzemeler:</strong>
                </p>
                <ul>
                  {selectedMeal.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p className="mt-4">
                  <strong>Tarifin Yapılışı:</strong>
                </p>
                <p>{selectedMeal.recipe.instructions}</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CategoryMeals;
