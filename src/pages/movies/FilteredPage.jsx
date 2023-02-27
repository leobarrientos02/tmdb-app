import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { FormatTitle } from "../../shared";
import { motion } from "framer-motion";
import Movie from "../../components/Movie/Movie";

const FilteredMoviesPage = ({ language }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getMovies = async (filter) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&language=${language}`
    );
    const movies = await data.json();
    setTotal(movies.total_pages > 500 ? 500 : movies.total_pages);
    setMovies(movies.results);
  };

  const pagination = (num) => {
    setPage(num);
  };

  useEffect(() => {
    getMovies(params.filter);
  });
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="FilterPage"
    >
      <h2 className="page-title">{FormatTitle(params.filter)} Movies</h2>
      <div className="page-grid">
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
      />
    </motion.div>
  );
};

export default FilteredMoviesPage;
