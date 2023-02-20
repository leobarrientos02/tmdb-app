import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import GenrePage from "./GenrePage";
import MoviePage from "./MoviePage";
import CompanyPage from "./CompanyPage";
import CategoryPage from "./CategoryPage";
import SearchPage from "./SearchPage";

const Pages = () => {
  return (
    <Routes className="pages">
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/genre/:id" element={<GenrePage />} />
      <Route path="/company/:id" element={<CompanyPage />} />
      <Route path="/search/:search" element={<SearchPage />} />
    </Routes>
  );
};

export default Pages;
