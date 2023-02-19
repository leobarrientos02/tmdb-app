import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

const GenrePage = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  let params = useParams();

  const getMovies = async (genre) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=1&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await data.json();

    setMovies(movies.results);
  };

  const getGenreName = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    var result = res.genres.filter(function (obj) {
      return obj.id === Number(id);
    })[0];
    setGenre(result.name);
  };
  useEffect(() => {
    getMovies(params.id);
    getGenreName(params.id);
  }, [params.id]);
  return (
    <div>
      <h2 className="page-title">{genre} Movies</h2>
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

export default GenrePage;
