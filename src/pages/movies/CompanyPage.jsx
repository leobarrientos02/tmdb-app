import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyBanner from "../../components/CompanyBanner/CompanyBanner";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
// import { scrollToTop } from "../shared";

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
    // scrollToTop();
    getMovies(id, page);
  };

  useEffect(() => {
    getMovies(params.id, 1);
  }, [params.id]);

  return (
    <div>
      <CompanyBanner companyId={params.id} />
      <div className="page-grid">
        {movies.map((movie) => {
          return (
            <Card
              key={movie?.id}
              id={movie?.id}
              title={movie?.title}
              poster_path={movie?.poster_path}
              release_date={movie?.release_date}
              vote={movie?.vote_average}
              type={"movie"}
            />
          );
        })}
      </div>

      <Pagination
        param={params.id}
        page={page}
        total={total}
        pagination={pagination}
        type={"company"}
      />
    </div>
  );
};

export default CompanyPage;
