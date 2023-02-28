import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import VotePercentage, {
  FormatDate,
  NullEmptyUndefinedChecker,
} from "../../../shared";
import "./episodePage.scss";
import ContentNotFound from "../../../components/NotFound/ContentNotFound";

const EpisodePage = ({ language }) => {
  const [episode, setEpisode] = useState({});
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getEpisode = async (id, seasonNumber, episodeNumber) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    setEpisode(res);
  };
  useEffect(() => {
    getEpisode(params.id, params.seasonNumber, params.episodeNumber);
  });

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: "-150%" }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="EpisodePage"
    >
      <h2 className="page-title">{episode?.name}</h2>
      <p className="season-episode">
        Season {episode?.season_number}, Episode {episode?.episode_number}
      </p>
      <p className="date">Air Date: {FormatDate(episode?.air_date)}</p>
      <p>Runtime: {episode?.runtime} minutes</p>
      <p>Average Vote: {VotePercentage(episode?.vote_average)}%</p>

      {NullEmptyUndefinedChecker(episode.still_path) === false ? (
        <ContentNotFound content="Episode" />
      ) : (
        <div className="image-wrapper">
          <img src={imagePath + episode?.still_path} alt={episode.name} />
        </div>
      )}

      <div className="overview">
        <h2>{episode?.overview === "" ? "" : "Overview"}</h2>
        <p>{episode?.overview}</p>
      </div>

      <div className={episode.crew.length > 0 ? "crew" : "hide"}>
        <h2 className="section-title">Crew</h2>
        <div className="persons">
          {episode?.crew?.map((person) => {
            return (
              <Link
                key={person.credit_id}
                to={`/person/${person.id}`}
                className="link"
              >
                <div className="person">
                  {NullEmptyUndefinedChecker(person?.profile_path) === false ? (
                    <ContentNotFound content="Person" />
                  ) : (
                    <img
                      src={imagePath + person?.profile_path}
                      alt={person?.name}
                    />
                  )}

                  <div className="info">
                    <h2>{person?.name}</h2>
                    <p>{person?.job}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className={episode.guest_stars.length > 0 ? "guest" : "hide"}>
        <h2 className="section-title">Guest Stars</h2>
        <div className="persons">
          {episode?.guest_stars?.map((person) => {
            return (
              <Link
                key={person.credit_id}
                to={`/person/${person.id}`}
                className="link"
              >
                <div className="person">
                  {NullEmptyUndefinedChecker(person?.profile_path) === false ? (
                    <ContentNotFound content="Person" />
                  ) : (
                    <img
                      src={imagePath + person?.profile_path}
                      alt={person?.name}
                    />
                  )}
                  <div className="info">
                    <h2>{person?.name}</h2>
                    <p>{person?.character}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
export default EpisodePage;
