import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import GenrePage from "./GenrePage";
import MoviePage from "./movies/MoviePage";
import CompanyPage from "./company/CompanyPage";
import FilteredMoviesPage from "./movies/FilteredPage";
import FilteredTVPage from "./tv/FilteredPage";
import ShowPage from "./tv/ShowPage";
import SeasonPage from "./tv/SeasonPage";
import EpisodePage from "./tv/EpisodePage";
import SearchPage from "./SearchPage";
import PersonPage from "./person/PersonPage";
import PopularPeople from "./person/PopularPeople";

const Pages = ({ language }) => {
  return (
    <Routes className="pages">
      <Route path="/" element={<HomePage language={language} />} />
      <Route path="/movie/:id" element={<MoviePage language={language} />} />
      <Route
        path="/movies/:filter"
        element={<FilteredMoviesPage language={language} />}
      />
      <Route
        path="/shows/:filter"
        element={<FilteredTVPage language={language} />}
      />
      <Route path="/tv/:id" element={<ShowPage language={language} />} />
      <Route
        path="/tv/:id/season/:seasonNumber"
        element={<SeasonPage language={language} />}
      />
      <Route
        path="/tv/:id/season/:seasonNumber/episode/:episodeNumber"
        element={<EpisodePage language={language} />}
      />
      <Route
        path="/persons/popular"
        element={<PopularPeople language={language} />}
      />
      <Route path="/person/:id" element={<PersonPage language={language} />} />
      <Route
        path="/:media/genre/:id"
        element={<GenrePage language={language} />}
      />
      <Route
        path="/company/:id"
        element={<CompanyPage language={language} />}
      />
      <Route
        path="/search/:media/:search"
        element={<SearchPage language={language} />}
      />
    </Routes>
  );
};

export default Pages;
