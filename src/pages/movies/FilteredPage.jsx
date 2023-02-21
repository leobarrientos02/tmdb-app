import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import { FormatTitle } from "../../shared";

const FilteredMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();

  const getMovies = async (filter) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await data.json();
    setMovies(movies.results);
  };
  useEffect(() => {
    getMovies(params.filter);
  });
  return (
    <div className="FilterPage">
      <h2 className="page-title">{FormatTitle(params.filter)} Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => {
          return (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote={movie.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilteredMoviesPage;
