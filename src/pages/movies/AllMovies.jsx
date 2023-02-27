import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Card from "../../components/Card/Card";
import "../../styles/AllMovies.scss";
import SortFilter from "../../components/SortFilter/SortFilter";

const AllMovies = ({ language }) => {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
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
        <SortFilter getSortValue={getSortValue} />
      </div>

      <div className="page-grid">
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
