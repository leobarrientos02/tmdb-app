import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Movie from "../../components/Movie/Movie";
import { FormatTitle } from "../../shared";
import "./AllMovies.scss";

const Movies = ({ language }) => {
  const params = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let sort =
    params.filter === "top_rated" ? "vote_average.desc" : "popularity.desc";
  const [sortBy, setSortBy] = useState(sort);

  const getPath = (param) => {
    if (param === "popular") {
      return `sort_by=${sortBy}&`;
    } else if (param === "upcoming") {
      let today = new Date();
      let future = new Date().setMonth(today.getMonth() + 1);
      return `primary_release_date.gte=${today.toISOString()}&primary_release_date.lte=${future}&sort_by=${sortBy}&`;
    } else if (param === "now_playing") {
      let today = new Date();
      let past = new Date().setMonth(today.getMonth() - 1);
      return `primary_release_date.gte=${past}&primary_release_date.lte=${today.toISOString()}&sort_by=${sortBy}&`;
    } else if (param === "top_rated") {
      return `vote_count.gte=1500&vote_average.gte=7&sort_by=${sortBy}&`;
    }
  };
  const getMovies = async () => {
    let path = getPath(params.filter);
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${path}page=${page}&language=${language}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setTotal(res.total_pages > 500 ? 500 : res.total_pages);
    setMovies(res.results);
  };

  const pagination = (page) => {
    setPage(page);
  };

  const getOptionValue = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    getMovies();
  });
  return (
    <div className="AllMovies">
      <div className="page-title">
        <h2>{FormatTitle(params.filter)} Movies</h2>
        <div className="sort">
          <select className="movies-sort-select" onChange={getOptionValue}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
            <option value="original_title.desc">Title (Z-A) Descending</option>
            <option value="original_title.asc">Title (A-Z) Ascending</option>
          </select>
        </div>
      </div>

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
    </div>
  );
};
export default Movies;
