import React from "react";
import Header from "../components/Header";

import CategoryMeals from "./categorymeals";
import { CategoryProvider } from "./CategoryContext";
import Categories from "./Categories";
import Footer from "../components/Footer";

const FoodRecipe = () => {
  return (
    <div>
      <Header />
      <CategoryProvider>
        <div className="container mx-auto min-h-screen">
          <Categories />
          <CategoryMeals />
        </div>
      </CategoryProvider>
      <Footer></Footer>
    </div>
  );
};

export default FoodRecipe;
