import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VotePercentage, { FormatDate } from "../../shared";
import NotFound from "../../images/imageNotFound.png";

const EpisodePage = () => {
  const [episode, setEpisode] = useState({});
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getEpisode = async (id, seasonNumber, episodeNumber) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setEpisode(res);
  };
  useEffect(() => {
    getEpisode(params.id, params.seasonNumber, params.episodeNumber);
  });

  return (
    <div className="EpisodePage">
      <h2 className="page-title">{episode?.name}</h2>
      <p className="season-episode">
        Season {episode?.season_number}, Episode {episode?.episode_number}
      </p>
      <p className="date">Air Date: {FormatDate(episode?.air_date)}</p>
      <p>Runtime: {episode?.runtime} minutes</p>
      <p>Average Vote: {VotePercentage(episode?.vote_average)}%</p>

      <div className="image-wrapper">
        <img src={imagePath + episode?.still_path} alt="" />
      </div>

      <div className="overview">
        <h2>Overview</h2>
        <p>{episode?.overview}</p>
      </div>

      <div className="cast">
        <h2>Cast</h2>
        {episode?.crew?.map((person) => {
          return (
            <Link key={person.id} to={`/person/${person.id}`} className="link">
              <div className="cast">
                <img
                  src={imagePath + person?.profile_path}
                  alt=""
                  onError={(e) => (e.currentTarget.src = NotFound)}
                />
                <div className="info">
                  <h2>{person?.name}</h2>
                  <p>{person?.job}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="guest">
        <h2>Guest Stars</h2>
        {episode?.guest_stars?.map((person) => {
          return (
            <Link key={person.id} to={`/person/${person.id}`} className="link">
              <div className="guest">
                <img
                  src={imagePath + person?.profile_path}
                  alt=""
                  onError={(e) => (e.currentTarget.src = NotFound)}
                />
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
  );
};
export default EpisodePage;
