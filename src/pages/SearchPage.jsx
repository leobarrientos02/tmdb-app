import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();

  const getMovies = async (search) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`
    );
    const res = await data.json();
    setMovies(res.results);
  };
  useEffect(() => {
    getMovies(params.search);
  });
  return (
    <div className="SearchPage">
      <h2 className="page-title">Results for search: {params.search}</h2>
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
export default SearchPage;
