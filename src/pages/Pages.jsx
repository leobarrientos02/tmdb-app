import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import GenrePage from "./movies/GenrePage";
import MoviePage from "./movies/MoviePage";
import CompanyPage from "./movies/CompanyPage";
import FilteredMoviesPage from "./movies/FilteredPage";
import FilteredTVPage from "./tv/FilteredPage";
import ShowPage from "./tv/ShowPage";
import SeasonPage from "./tv/SeasonPage";
import EpisodePage from "./tv/EpisodePage";
import SearchPage from "./tv/SearchPage";
import PersonPage from "./person/PersonPage";
import PopularPeople from "./person/PopularPeople";

const Pages = () => {
  return (
    <Routes className="pages">
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/movies/:filter" element={<FilteredMoviesPage />} />
      <Route path="/movies/genre/:id" element={<GenrePage />} />
      <Route path="/movie/company/:id" element={<CompanyPage />} />
      <Route path="/tvs/:filter" element={<FilteredTVPage />} />
      <Route path="/tv/:id" element={<ShowPage />} />
      <Route path="/tv/:id/season/:seasonNumber" element={<SeasonPage />} />
      <Route
        path="/tv/:id/season/:seasonNumber/episode/:episodeNumber"
        element={<EpisodePage />}
      />
      <Route path="/persons/popular" element={<PopularPeople />} />
      <Route path="/person/:id" element={<PersonPage />} />
      <Route path="/search/:search" element={<SearchPage />} />
    </Routes>
  );
};

export default Pages;
