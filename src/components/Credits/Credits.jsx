import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormatDate } from "../../shared";
import "./credits.scss";
const Credits = ({ id }) => {
  const [credits, setCredits] = useState([]);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getCredits = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setCredits(res);
  };

  useEffect(() => {
    getCredits();
  });
  return (
    <div className="credits">
      <h2 className="title">Credits</h2>
      <div className="cast">
        <h2 className="title">Cast</h2>
        <div className="page-grid">
          {credits?.cast?.map((cast) => {
            return (
              <Link to={`/${cast?.media_type}/${cast?.id}`} className="link">
                <div className="cast" key={cast.credit_id}>
                  <img src={imagePath + cast?.poster_path} alt="" />
                  <h2>{cast?.title}</h2>
                  <p>{FormatDate(cast?.release_date)}</p>
                  <p>Character: {cast?.character}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="crew">
        <h2 className="title">Crew</h2>
        <div className="page-grid">
          {credits?.crew?.map((crew) => {
            return (
              <Link to={`/${crew?.media_type}/${crew?.id}`} className="link">
                <div className="crew" key={crew.credit_id}>
                  <img src={imagePath + crew?.poster_path} alt="" />
                  <h2>{crew?.title}</h2>
                  <p>{FormatDate(crew?.release_date)}</p>
                  <p>Role: {crew?.job}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Credits;
