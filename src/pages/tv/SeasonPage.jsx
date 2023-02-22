import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormatDate } from "../../shared";
import NotFound from "../../images/imageNotFound.png";

const Season = () => {
  const [season, setSeason] = useState({});
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getSeason = async (id, seasonNumber) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/60625/season/60059?api_key=${process.env.REACT_APP_API_KEY}`
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
      <p className="season-num">Season {season?.season_number}</p>
      <p className="date">{FormatDate(season?.air_date)}</p>
      <img
        src={imagePath + season?.profile_path}
        alt=""
        onError={(e) => (e.currentTarget.src = NotFound)}
      />

      <div className="overview">
        <h2>Overview</h2>
        <p>{season?.overview}</p>
      </div>

      <div className="episodes">
        <h2>Episodes</h2>
      </div>
    </div>
  );
};
export default Season;
