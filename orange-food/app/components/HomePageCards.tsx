"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HomePageCards = () => {
  return (
    <div>
      <div className="">
        <h1 className="text-center mt-12 font-bold text-4xl">
          Lezzetli Tarifleri Keşfedin
        </h1>
        <p className="text-center mt-3 text-xl">
          Yapay zeka nın lezzet dolu yolculuğuna çıkmaya hazırmısnız?
        </p>
      </div>
      <div className="container mx-auto py-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kart 1 - Yapay Zeka */}
          <Card className="bg-card dark:bg-card">
            <CardHeader className="p-5">
              <img
                src="yapayzeka_card.png"
                alt="Yapay Zeka Yemek Tarifleri"
                className="w-full h-96 object-cover"
              />
            </CardHeader>
            <CardContent>
              <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
                AI Yemek Tarifleri
              </h2>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                className="w-full"
                onClick={() => (window.location.href = "/ai-recipes")}
              >
                Keşfet
              </Button>
            </CardFooter>
          </Card>

          {/* Kart 2 - Tarifler */}
          <Card className="bg-card dark:bg-card">
            <CardHeader className="p-5">
              <img
                src="tarif_card.png"
                alt="Yemek Tarifleri"
                className="w-full h-96 object-cover"
              />
            </CardHeader>
            <CardContent>
              <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
                Yemek Tarifleri
              </h2>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                className="w-full"
                onClick={() => (window.location.href = "/foodrecipe")}
              >
                İncele
              </Button>
            </CardFooter>
          </Card>

          {/* Kart 3 - Günlük Menü */}
          <Card className="bg-card dark:bg-card">
            <CardHeader className="p-5">
              <img
                src="gunlukmenu_card.png"
                alt="Günlük Menü"
                className="w-full h-96 object-cover"
              />
            </CardHeader>
            <CardContent>
              <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
                Günlük Menü
              </h2>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                className="w-full"
                onClick={() => (window.location.href = "/daily-menu")}
              >
                Görüntüle
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePageCards;
