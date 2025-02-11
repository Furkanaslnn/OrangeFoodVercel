"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

// API verileri için TypeScript arayüzleri (isteğe bağlı)
interface Item {
  name: string;
  recipe: string;
}

interface Meal {
  image: string;
  items: Item[];
  mealTime: string;
}

interface DailyMenu {
  [key: string]: Meal[];
}

const DailyMenuComponent: React.FC = () => {
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/daily-menu");
        if (!response.ok) {
          throw new Error("Veriler yüklenirken bir hata oluştu.");
        }
        const data = await response.json();
        setDailyMenu(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold text-center text-primary">
          Yükleniyor...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold text-center text-primary">Hata</h1>
        <p className="text-center text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-10 px-6">
          <h1 className="text-4xl font-bold text-center mb-12 text-primary">
            Günlük Yemek Menüsü
          </h1>
          <div className="space-y-10">
            {dailyMenu &&
              Object.entries(dailyMenu).map(([mealTime, meals], index) => (
                <Card
                  key={index}
                  className="bg-card text-card-foreground shadow-md border border-border"
                >
                  <CardHeader className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      {mealTime}
                    </h2>
                    <img
                      src={meals[0].image}
                      alt={mealTime}
                      className="w-full max-w-md h-56 object-cover rounded-lg mb-6 shadow-md"
                    />
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
                      Yemekler ve Tarifler:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {meals[0].items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-muted rounded-lg shadow-sm hover:shadow-lg transition-all"
                        >
                          <h3 className="text-lg font-semibold text-primary mb-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.recipe}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-center mt-6">
                    <p className="text-muted-foreground text-sm">
                      Bu menü sizin için hazırlandı!
                    </p>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DailyMenuComponent;
