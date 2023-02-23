import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormatTitle } from "../../shared";
import Pagination from "../../components/Pagination/Pagination";
import Card from "../../components/Card/Card";
import { motion } from "framer-motion";

const FilteredTVPage = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getShows = async (filter) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${filter}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    const res = await data.json();
    setTotal(res.total_pages > 500 ? 500 : res.total_pages);
    setShows(res.results);
  };

  const pagination = (num) => {
    // scrollToTop();
    setPage(num);
  };

  useEffect(() => {
    getShows(params.filter);
  });
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="FilterPage"
    >
      <div className="page-heading">
        <h2 className="page-title">{FormatTitle(params.filter)} TV Shows</h2>
        <div className="sort">
          <h2>Sort</h2>
        </div>
      </div>
      <div className="page-grid">
        {shows.map((show) => {
          return (
            <Card
              key={show.id}
              id={show.id}
              title={show.name}
              poster_path={show.poster_path}
              release_date={show.first_air_date}
              vote={show.vote_average}
              type={"tv"}
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
    </motion.div>
  );
};

export default FilteredTVPage;
