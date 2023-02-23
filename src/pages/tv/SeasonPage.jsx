import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import VotePercentage, { FormatDate } from "../../shared";
import NotFound from "../../images/imageNotFound.png";
import "../../styles/seasonPage.scss";

const Season = () => {
  const [season, setSeason] = useState({});
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getSeason = async (id, seasonNumber) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setSeason(res);
  };
  useEffect(() => {
    getSeason(params.id, params.seasonNumber);
  });

  return (
    <div className="SeasonPage">
      <h2 className="page-title">{season?.name}</h2>
      <p className="date">Air Date: {FormatDate(season?.air_date)}</p>

      <div className="image-wrapper">
        <img
          src={imagePath + season?.poster_path}
          alt=""
          onError={(e) => (e.currentTarget.src = NotFound)}
        />
      </div>

      <div className="overview">
        <h2>{season?.overview === "" ? "" : "Overview"}</h2>
        <p>{season?.overview}</p>
      </div>

      <div className="episodes-sections">
        <h2>Episodes</h2>
        <Splide
          options={{
            perPage: 3,
            drag: "free",
            gap: "2rem",
            arrows: true,
            pagination: false,
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
                  <img
                    src={imagePath + episode.still_path}
                    alt=""
                    onError={(e) => (e.currentTarget.src = NotFound)}
                  />
                  <h2 className="content-title">{episode.name}</h2>
                  <p className="date">{FormatDate(episode.air_date)}</p>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};
export default Season;
