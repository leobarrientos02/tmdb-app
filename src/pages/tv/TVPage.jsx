import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VotePercentage, { FormatDate } from "../../shared";
import { motion } from "framer-motion";
import "../../styles/moviePage.scss";

const TVPage = () => {
  const [show, setShow] = useState([]);
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getShow = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setShow(res);
  };
  useEffect(() => {
    getShow(params.id);
  });
  return (
    <div className="moviePage">
      <h2>{show?.name}</h2>
      <p>
        Released Date: {FormatDate(show?.first_air_date)} -{" "}
        {FormatDate(show?.last_air_date)}
      </p>
      <p>{show?.number_of_seasons} Seasons</p>
      <p>
        {show?.number_of_episodes} Episodes ({show?.episode_run_time} minutes
        per episode)
      </p>
      <p>Rating: {VotePercentage(show?.vote_average)}%</p>
      <p className="released-icon">{show?.status}</p>

      <div className="genres-section">
        {show?.genres?.map((genre) => {
          return (
            <Link
              key={genre.id}
              to={`/movies/genre/${genre.id}`}
              className="genre"
            >
              {genre.name}
            </Link>
          );
        })}
      </div>

      <motion.img
        src={imagePath + show?.backdrop_path}
        alt={show?.title}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <div>
        <h2 className="section-title">Overview</h2>
        <p>{show?.overview}</p>
      </div>

      <div className="movie-production">
        <h2>Production Companies</h2>
        <div className="companies">
          {show?.production_companies?.map((company) => {
            return (
              <Link
                to={`/tv/company/${company.id}`}
                className="company"
                key={company.id}
              >
                <img src={imagePath + company.logo_path} alt={company.name} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TVPage;
