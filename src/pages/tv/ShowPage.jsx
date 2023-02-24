import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import VotePercentage, { FormatDate } from "../../shared";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";
import ProductionCompanies from "../../components/ProductionCompanies/ProductionCompanies";
import ReviewSection from "../../components/Reviews/ReviewSection";
import SimilarContent from "../../components/SimilarContent/SimilarContent";
import ContentImages from "../../components/ContentImages/ContentImages";
import Credits from "../../components/Credits/Credits";
import "../../styles/tvPage.scss";

const ShowPage = () => {
  const [show, setShow] = useState([]);
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getShow = async (show_id) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}tv/${show_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const res = await data.json();
    setShow(res);
  };
  useEffect(() => {
    getShow(params.id);
  });
  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: "-150%" }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="tvPage"
    >
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

      <img src={imagePath + show?.backdrop_path} alt={show?.title} />

      <div className="tv-overview">
        <h2 className="section-title">
          {show?.overview === "" ? "" : "Overview"}
        </h2>
        <p>{show?.overview}</p>
      </div>

      <ContentImages api_path={`tv/${show?.id}`} />

      <ProductionCompanies data={show} />

      <div className="tv-seasons">
        <h2 className="title">Seasons</h2>
        <Splide
          options={{
            perPage: 5,
            drag: "free",
            gap: "2rem",
            arrows: false,
            pagination: true,
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

      <ReviewSection api_path={`tv/${params.id}`} />

      <Credits api_path={`tv/${params.id}`} />

      <SimilarContent id={params.id} media_type={"tv"} />
    </motion.div>
  );
};

export default ShowPage;
