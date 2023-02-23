import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { scrollToTop } from "../shared";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getMovies = async (search) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}&page=${page}`
    );
    const res = await data.json();
    setTotal(res.total_pages);
    setMovies(res.results);
  };

  const pagination = (pageNum) => {
    // scrollToTop();
    setPage(pageNum);
  };

  useEffect(() => {
    getMovies(params.search);
  });

  // let pages = Array.from(Array(total), (_, i) => i + 1);
  return (
    <div className="SearchPage">
      <h2 className="page-title">Results for search: {params.search}</h2>
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
        param={params.search}
        page={page}
        total={total}
        pagination={pagination}
        type="OneParameter"
      />
    </div>
  );
};
export default SearchPage;
