import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { FormatTitle } from "../shared";

const CategoryPage = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();
  let categoryTitle = params.category;

  const getMovies = async (category) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${categoryTitle}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await data.json();
    setMovies(movies.results);
  };
  useEffect(() => {
    getMovies(params.type);
  });
  return (
    <div className="categoryPage">
      <h2 className="page-title">{FormatTitle(categoryTitle)} Movies</h2>
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

export default CategoryPage;
