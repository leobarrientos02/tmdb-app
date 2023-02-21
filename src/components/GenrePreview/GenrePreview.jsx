import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./genrePreview.scss";
import Carousel from "../Carousel/Carousel";

const GenrePreview = ({ name, genreId }) => {
  const [movies, setMovies] = useState([]);

  const getMovies = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await data.json();
    setMovies(movies.results);
  };
  useEffect(() => {
    getMovies(genreId);
  });
  return (
    <div className="genrePreview">
      <div className="genre-heading">
        <h2>{name}</h2>
        <Link to={`/movies/genre/${genreId}`} className="link">
          View More
        </Link>
      </div>
      <Carousel movies={movies} />
    </div>
  );
};

export default GenrePreview;
