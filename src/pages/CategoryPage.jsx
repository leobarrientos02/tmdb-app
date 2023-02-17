import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function formatTitle(string) {
  let title = "";
  switch (string) {
    case "popular":
      title = "Popular";
      break;
    case "now_playing":
      title = "Now Playing";
      break;
    case "top_rated":
      title = "Top Rated";
      break;
    case "upcoming":
      title = "Upcoming";
      break;
    default:
      title = "All";
  }
  return title;
}

const CategoryPage = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();
  let categoryTitle = params.category;

  const getMovies = async (category) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.API_KEY}`
    );
    const movies = await data.json();
    setMovies(movies.results);
  };
  useEffect(() => {
    getMovies(params.type);
  });
  return (
    <div>
      <h2>{formatTitle(categoryTitle)} Movies</h2>
      <div>
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
