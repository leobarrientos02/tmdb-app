import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyBanner from "../components/CompanyBanner";
import Movie from "../components/Movie";
import { scrollToTop } from "../shared";

const CompanyPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getMovies = async (id, pageNum) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_companies=${id}&page=${pageNum}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await data.json();
    setPage(pageNum);
    setTotal(movies.total_pages);
    setMovies(movies.results);
  };

  const pagination = (id, page) => {
    scrollToTop();
    getMovies(id, page);
  };

  useEffect(() => {
    getMovies(params.id, 1);
  }, [params.id]);

  let pages = Array.from(Array(total), (_, i) => i + 1);
  return (
    <div>
      <CompanyBanner companyId={params.id} />
      <div className="movie-grid">
        {movies.map((movie) => {
          return (
            <Movie
              key={movie?.id}
              id={movie?.id}
              title={movie?.title}
              poster_path={movie?.poster_path}
              release_date={movie?.release_date}
              vote={movie?.vote_average}
            />
          );
        })}
      </div>

      <div className="pagination-container">
        <div className="pagination">
          <button
            className={page === 1 ? "block-link" : "pagination-btn"}
            onClick={() => pagination(params.id, page - 1)}
          >
            {"<"} Previous
          </button>
          <div className={total > 12 ? "numbers-large" : "numbers-small"}>
            {pages.map((i) => {
              return (
                <button
                  className={page === i ? "current-link" : "pagination-btn"}
                  onClick={() => pagination(params.id, i)}
                  key={i}
                >
                  {i}
                </button>
              );
            })}
          </div>
          <button
            className={page === total ? "block-link" : "pagination-btn"}
            onClick={() => pagination(params.id, page + 1)}
          >
            Next {">"}
          </button>
        </div>
      </div>
      <p className="current-pagenum">Current Page: {page}</p>
    </div>
  );
};

export default CompanyPage;
