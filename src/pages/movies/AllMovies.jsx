import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Card from "../../components/Card/Card";
import "../../styles/AllMovies.scss";

const AllMovies = ({ language }) => {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [showSort, setShowSort] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getMovies = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}discover/movie/?api_key=${process.env.REACT_APP_API_KEY}&sort_by=${sortBy}&page=${page}&language=${language}`
    );
    const movies = await data.json();
    setTotal(movies.total_pages > 500 ? 500 : movies.total_pages);
    setMovies(movies.results);
  };

  const pagination = (num) => {
    setPage(num);
  };

  const getSortValue = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    getMovies();
  });
  return (
    <div className="AllMovies">
      <div className="title">
        <h2>All Movies</h2>
      </div>

      <div className="sort-filter-movies-wrapper">
        <div className="sort-filter">
          <div className="sort">
            <h2>Sort</h2>
            <div className={showSort === false ? "hide" : "show"}>
              <p>Sort movies by</p>
              <select onChange={getSortValue}>
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="release_date.desc">
                  Release Date Descending
                </option>
                <option value="release_date.asc">Release Date Ascending</option>
                <option value="original_title.asc">Title (A-Z)</option>
                <option value="original_title.desc">Title (Z-A)</option>
              </select>
            </div>
          </div>
          <div className="filter">
            <h2>Filter</h2>
          </div>
        </div>

        <div className="movies-wrapper">
          <div className="movies">
            {movies.map((movie) => {
              return (
                <Card
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  release_date={movie.release_date}
                  vote={movie.vote_average}
                  type={"movie"}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Pagination
        param={""}
        page={page}
        total={total}
        pagination={pagination}
      />
    </div>
  );
};
export default AllMovies;
