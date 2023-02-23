import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import VotePercentage, { FormatDate } from "../../shared";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";
import "../../styles/tvPage.scss";
import ProductionCompanies from "../../components/ProductionCompanies/ProductionCompanies";
import ReviewSection from "../../components/Reviews/ReviewSection";
import SimilarContent from "../../components/SimilarContent/SimilarContent";
import ContentImages from "../../components/ContentImages/ContentImages";

const ShowPage = () => {
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
    <div className="tvPage">
      <h2 className="page-title">{show?.name}</h2>
      <p>
        {FormatDate(show?.first_air_date)} to {FormatDate(show?.last_air_date)}
      </p>
      <p>{show?.number_of_seasons} Seasons</p>
      <p>
        {show?.number_of_episodes} Episodes ({show?.episode_run_time} minutes
        per episode)
      </p>
      <div className="creators">
        <p>Creators:</p>
        {show?.created_by?.map((creator) => {
          return (
            <Link
              key={creator.id}
              to={`/person/${creator.id}`}
              className="creator"
            >
              <img
                src={imagePath + creator.profile_path}
                alt=""
                onError={(e) => (e.currentTarget.src = NotFound)}
              />
              <p>{creator.name}</p>
            </Link>
          );
        })}
      </div>
      <p>Rating: {VotePercentage(show?.vote_average)}%</p>
      <p className="released-icon">{show?.status}</p>

      <div className="genres-section">
        {show?.genres?.map((genre) => {
          return (
            <Link key={genre.id} to={`/tv/genre/${genre.id}`} className="genre">
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

      <div className="tv-overview">
        <h2 className="section-title">
          {show?.overview === "" ? "" : "Overview"}
        </h2>
        <p>{show?.overview}</p>
      </div>

      <ContentImages url={`tv/${show?.id}/images`} />

      <ProductionCompanies res={show} type="show" />

      <div className="tv-seasons">
        <h2 className="title">Seasons</h2>
        <Splide
          options={{
            perPage: 5,
            drag: "free",
            gap: "2rem",
            arrows: true,
            pagination: false,
          }}
          className="seasons"
        >
          {show?.seasons?.map((season) => {
            return (
              <SplideSlide key={season.id}>
                <Link
                  to={`/tv/${params.id}/season/${season?.season_number}`}
                  className="season"
                >
                  <img
                    src={imagePath + season.poster_path}
                    alt=""
                    onError={(e) => (e.currentTarget.src = NotFound)}
                  />
                  <h2 className="content-title">{season.name}</h2>
                  <p className="date">{FormatDate(season.air_date)}</p>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>

      <ReviewSection id={params.id} type={"tv"} />

      <SimilarContent id={params.id} type={"tv"} />
    </div>
  );
};

export default ShowPage;
