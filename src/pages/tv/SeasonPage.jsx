import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { motion } from "framer-motion";
import VotePercentage, {
  FormatDate,
  NullEmptyUndefinedChecker,
} from "../../shared";
import "../../styles/seasonPage.scss";
import Credits from "../../components/Credits/Credits";
import ContentNotFound from "../../components/NotFound/ContentNotFound";

const Season = ({ language }) => {
  const [season, setSeason] = useState({});
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getSeason = async (id, seasonNumber) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    setSeason(res);
  };
  useEffect(() => {
    getSeason(params.id, params.seasonNumber);
  });

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: "-150%" }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="SeasonPage"
    >
      <h2 className="page-title">{season?.name}</h2>
      <p className="date">Air Date: {FormatDate(season?.air_date)}</p>

      <div className="image-wrapper">
        {NullEmptyUndefinedChecker(season?.poster_path) === false ? (
          <ContentNotFound content="Season" />
        ) : (
          <img src={imagePath + season?.poster_path} alt={season?.name} />
        )}
      </div>

      <div className="overview">
        <h2>{season?.overview === "" ? "" : "Overview"}</h2>
        <p>{season?.overview}</p>
      </div>

      <div
        className={season?.episodes.length === 0 ? "hide" : "episodes-sections"}
      >
        <h2>Episodes</h2>
        <Splide
          options={{
            perPage: 3,
            drag: "free",
            gap: "2rem",
            arrows: false,
            pagination: true,
          }}
          className="episodes"
        >
          {season?.episodes?.map((episode) => {
            return (
              <SplideSlide key={episode.show_id} className="episode-card">
                <Link
                  to={`/tv/${params.id}/season/${season?.season_number}/episode/${episode.episode_number}`}
                  className="link"
                >
                  <p className="vote">
                    {VotePercentage(episode.vote_average)}%
                  </p>

                  {NullEmptyUndefinedChecker(episode.still_path) === false ? (
                    <ContentNotFound content="Episode" />
                  ) : (
                    <img
                      src={imagePath + episode.still_path}
                      alt={episode.name}
                    />
                  )}
                  <h2 className="content-title">{episode.name}</h2>
                  <p className="date">{FormatDate(episode.air_date)}</p>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
      <Credits
        api_path={`tv/${params.id}/season/${params.seasonNumber}`}
        language={language}
      />
    </motion.div>
  );
};
export default Season;
