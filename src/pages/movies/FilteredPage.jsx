import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import Pagination from "../../components/Pagination";
import { FormatTitle } from "../../shared";

const FilteredMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getMovies = async (filter) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    const movies = await data.json();
    setTotal(movies.total_pages > 500 ? 500 : movies.total_pages);
    setMovies(movies.results);
  };

  const pagination = (num) => {
    // scrollToTop();
    setPage(num);
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

      <Pagination
        param={params.filter}
        page={page}
        total={total}
        pagination={pagination}
        type={"OneParameter"}
      />
    </div>
  );
};

export default FilteredMoviesPage;
