import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyBanner from "../../components/CompanyBanner/CompanyBanner";
import Pagination from "../../components/Pagination/Pagination";
import { motion } from "framer-motion";
import "./companyPage.scss";
import Movie from "../../components/Movie/Movie";
import Show from "../../components/Show/Show";

const CompanyPage = ({ language }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [mediaType, setMediaType] = useState("movie");
  const [sortBy, setSortBy] = useState("popularity.desc");
  let params = useParams();

  const getData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?with_companies=${params.id}&page=${page}&sort_by=${sortBy}&api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const movies = await data.json();
    setTotal(movies.total_pages);
    setData(movies.results);
  };

  const pagination = (page) => {
    setPage(page);
  };

  const getOptionValue = (e) => {
    setSortBy(e.target.value);
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
      <CompanyBanner company_id={params.id} language={language} />

      <div className="manage-result">
        <div className="toggle_media">
          <h2
            onClick={() => setMediaType("movie")}
            className={mediaType === "movie" ? "movie-active" : "movie"}
          >
            Movies
          </h2>
          <h2
            onClick={() => setMediaType("tv")}
            className={mediaType === "tv" ? "tv-active" : "tv"}
          >
            Shows
          </h2>
        </div>

        <select className="company-sort-select" onChange={getOptionValue}>
          <option value="" disabled selected>
            Sort Results
          </option>
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
      {mediaType === "movie" ? (
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
      ) : (
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
