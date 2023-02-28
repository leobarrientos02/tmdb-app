import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormatDate, NullEmptyUndefinedChecker } from "../../shared";
import "./personCredits.scss";
import ContentNotFound from "../NotFound/ContentNotFound";

const PersonCredits = ({ id }) => {
  const [credits, setCredits] = useState([]);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getCredits = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const res = await data.json();
    setCredits(res);
  };

  useEffect(() => {
    getCredits();
  });
  return (
    <div className="credits">
      <div className="cast">
        <h2 className="title">
          {credits?.cast === undefined || credits?.cast?.length === 0
            ? ""
            : "Cast"}
        </h2>
        <div className="page-grid">
          {credits?.cast?.map((cast) => {
            return (
              <Link
                to={`/${cast?.media_type}/${cast?.id}`}
                key={cast.credit_id}
                className="link"
              >
                <div className="cast">
                  {NullEmptyUndefinedChecker(cast?.poster_path) === false ? (
                    <ContentNotFound content="MediaCredit" />
                  ) : (
                    <img
                      src={imagePath + cast?.poster_path}
                      alt={cast?.title}
                    />
                  )}
                  <h2>{cast?.title}</h2>
                  <p>
                    {FormatDate(
                      cast?.media_type === "movie"
                        ? cast?.release_date
                        : cast?.first_air_date
                    )}
                  </p>
                  <p>
                    {cast?.character === "" || cast?.character === undefined
                      ? ""
                      : `"${cast?.character}"`}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="crew">
        <h2 className="title">
          {credits?.crew === undefined || credits?.crew.length === 0
            ? ""
            : "Crew"}
        </h2>
        <div className="page-grid">
          {credits?.crew?.map((crew) => {
            return (
              <Link
                to={`/${crew?.media_type}/${crew?.id}`}
                key={crew.credit_id}
                className="link"
              >
                <div className="crew">
                  {NullEmptyUndefinedChecker(crew?.poster_path) === false ? (
                    <ContentNotFound content="MediaCredit" />
                  ) : (
                    <img
                      src={imagePath + crew?.poster_path}
                      alt={crew?.title}
                    />
                  )}

                  <h2>{crew?.title}</h2>
                  <p>
                    {FormatDate(
                      crew?.media_type === "movie"
                        ? crew?.release_date
                        : crew?.first_air_date
                    )}
                  </p>
                  <p>
                    {crew?.job === "" || crew?.job === undefined
                      ? ""
                      : `Role: ${crew?.job}`}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PersonCredits;
