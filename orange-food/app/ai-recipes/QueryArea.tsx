"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

// Ingredient tipi bir string'dir
interface Recipe {
  id: number; // Tarifin benzersiz kimliği
  name: string; // Tarif adı
  image: string; // Tarifin görsel yolu
  recipe: {
    ingredients: string[]; // Malzemelerin listesi
    instructions: string; // Tarifin yapılış talimatları
  };
}

// API'den dönen tarifler bir liste olarak tanımlanır
type Recipes = Recipe[];

const QueryArea = () => {
  const [ingredients, setIngredients] = useState(""); // Kullanıcı girdisi
  const [recipes, setRecipes] = useState<Recipes>([]); // Tarif sonuçları

  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [error, setError] = useState(""); // Hata mesajı

  const handleGenerateRecipe = async () => {
    // Tarif oluşturma işlemi
    setLoading(true); // Yükleniyor durumunu başlat
    setError(""); // Önceki hatayı temizle
    setRecipes([]); // Önceki tarif sonuçlarını temizle

    try {
      const response = await fetch(`http://127.0.0.1:8080/api/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }), // Kullanıcı girdisini gönder
      });

      if (!response.ok) {
        throw new Error("Tarif oluşturulurken bir hata oluştu.");
      }

      const data = await response.json(); // JSON formatında yanıt al
      setRecipes(data); // Tarif sonuçlarını kaydet
    } catch (err) {
      setError((err as Error).message || "Bilinmeyen bir hata oluştu.");
    } finally {
      setLoading(false); // Yükleniyor durumunu sonlandır
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.png')", // Arka plan resmi yolu
        }}
      >
        {/* İçerik Alanı */}
        <div className="my-10 mx-2 w-full max-w-3xl p-10 bg-card text-card-foreground rounded-3xl shadow-lg border border-border">
          <h1 className="text-3xl font-bold text-center mb-6">Tarif Bulucu</h1>
          {/* Giriş Alanı */}
          <Input
            placeholder="Malzemelerinizi yazın (örnek: Tavuk, sarımsak, zeytinyağı)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full mb-4 h-16"
          />
          <Button
            onClick={handleGenerateRecipe}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading || !ingredients.trim()}
          >
            {loading ? "Tarif Oluşturuluyor..." : "Tarifi Gör"}
          </Button>

          {/* Hata Mesajı */}
          {error && (
            <p className="mt-4 text-red-500 text-center font-semibold">
              {error}
            </p>
          )}

          {/* Tarif Alanı */}
          {recipes.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Tarifler</h2>
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-muted text-muted-foreground border border-border rounded-md p-4 mb-4"
                >
                  <p className="font-bold">Yemek Adı:</p>
                  <p>{recipe?.name || "Ad Bilgisi Yok"}</p>
                  <p className="font-bold mt-4">Malzemeler:</p>
                  {recipe?.recipe?.ingredients?.length > 0 ? (
                    <ul className="list-disc ml-6">
                      {recipe.recipe.ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Malzeme bilgisi bulunamadı.</p>
                  )}
                  <p className="font-bold mt-4">Tarif:</p>
                  <p>
                    {recipe?.recipe?.instructions || "Talimat bilgisi yok."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryArea;
