import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

const GenrePage = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();
  let genre = "Action";

  const getMovies = async (genre) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=1&api_key=${process.env.API_KEY}`
    );
    const movies = await data.json();

    setMovies(movies.results);
  };
  useEffect(() => {
    getMovies(params.type);
  }, [params.type]);
  return (
    <div>
      <h2>{genre} Movies</h2>
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
  );
};

export default GenrePage;
