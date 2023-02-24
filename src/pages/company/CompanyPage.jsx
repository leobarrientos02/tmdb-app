import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyBanner from "../../components/CompanyBanner/CompanyBanner";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import { motion } from "framer-motion";

const CompanyPage = ({ language }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getMovies = async (company_id, page_num) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}discover/movie?with_companies=${company_id}&page=${page_num}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const movies = await data.json();
    setPage(page_num);
    setTotal(movies.total_pages);
    setMovies(movies.results);
  };

  const pagination = (id, page) => {
    getMovies(id, page);
  };

  useEffect(() => {
    getMovies(params.id, 1);
  }, [params.id]);

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: "-150%" }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
      <CompanyBanner company_id={params.id} />
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
    </motion.div>
  );
};

export default CompanyPage;
