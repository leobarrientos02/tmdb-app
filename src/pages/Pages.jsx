import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import GenrePage from "./GenrePage";
import MoviePage from "./movies/movie/MoviePage";
import CompanyPage from "./company/CompanyPage";
import Shows from "./tv/shows/Shows";
import ShowPage from "./tv/show/ShowPage";
import SeasonPage from "./tv/season/SeasonPage";
import EpisodePage from "./tv/episode/EpisodePage";
import SearchPage from "./search/SearchPage";
import PersonPage from "./person/personPage/PersonPage";
import PopularPeople from "./person/popular/PopularPeople";
import Movies from "./movies/Movies";

const Pages = ({ language }) => {
  return (
    <Routes className="pages">
      <Route path="/" element={<HomePage language={language} />} />
      <Route path="/movie/:id" element={<MoviePage language={language} />} />
      <Route path="/movies/:filter" element={<Movies language={language} />} />
      <Route path="/shows/:filter" element={<Shows language={language} />} />
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
      <Route path="*" element={<HomePage language={language} />} />
    </Routes>
  );
};

export default Pages;
