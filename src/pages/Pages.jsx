import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import GenrePage from "./movies/GenrePage";
import MoviePage from "./movies/MoviePage";
import CompanyPage from "./movies/CompanyPage";
import FilteredMoviesPage from "./movies/FilteredPage";
import FilteredTVPage from "./tv/FilteredPage";
import TVPage from "./tv/TVPage";
import SearchPage from "./SearchPage";

const Pages = () => {
  return (
    <Routes className="pages">
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/movies/:filter" element={<FilteredMoviesPage />} />
      <Route path="/movies/genre/:id" element={<GenrePage />} />
      <Route path="/movie/company/:id" element={<CompanyPage />} />
      <Route path="/shows/:filter" element={<FilteredTVPage />} />
      <Route path="/show/:id" element={<TVPage />} />
      <Route path="/show/season/:id" element={<TVPage />} />
      <Route path="/show/season/episode/:id" element={<TVPage />} />
      <Route path="/search/:search" element={<SearchPage />} />
    </Routes>
  );
};

export default Pages;
