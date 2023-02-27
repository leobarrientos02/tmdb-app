import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyBanner from "../../components/CompanyBanner/CompanyBanner";
import Pagination from "../../components/Pagination/Pagination";
import { motion } from "framer-motion";
import Movie from "../../components/Movie/Movie";
import Show from "../../components/Show/Show";

const CompanyPage = ({ language }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getData = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}discover/movie?with_companies=${params.id}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const movies = await data.json();
    setTotal(movies.total_pages);
    setData(movies.results);
  };

  const pagination = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getData();
  });

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: "-150%" }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
      <CompanyBanner company_id={params.id} />

      {params.media === "tv" ? (
        <div className="page-grid">
          {data.map((content) => {
            return (
              <Show
                key={content.id}
                id={content.id}
                name={content.name}
                poster_path={content.poster_path}
                aired_date={content.first_air_date}
                vote={content.vote_average}
              />
            );
          })}
        </div>
      ) : (
        <div className="page-grid">
          {data.map((content) => {
            return (
              <Movie
                key={content.id}
                id={content.id}
                title={content.title}
                poster_path={content.poster_path}
                release_date={content.release_date}
                vote={content.vote_average}
                type={params.media}
              />
            );
          })}
        </div>
      )}

      <Pagination
        param={params.id}
        page={page}
        total={total}
        pagination={pagination}
      />
    </motion.div>
  );
};

export default CompanyPage;
