import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentNotFound from "../NotFound/ContentNotFound";
import "./credits.scss";

const Credits = ({ api_path, language }) => {
  const [credits, setCredits] = useState([]);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getCredits = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${api_path}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    setCredits(res.cast);
  };

  useEffect(() => {
    getCredits();
  });

  if (credits.length > 0) {
    return (
      <div className="credits">
        <h2 className="section-title">Credits</h2>
        <div className="persons">
          {credits?.map((person) => {
            return (
              <Link
                to={`/person/${person.id}`}
                key={person?.credit_id}
                className="link"
              >
                <div className="person">
                  <div className="person-image-wrapper">
                    {person.profile_path === null ? (
                      <ContentNotFound content={"Person"} />
                    ) : (
                      <img
                        src={imagePath + person?.profile_path}
                        alt={person?.name}
                      />
                    )}
                  </div>

                  <div className="details">
                    <h2>{person.name}</h2>
                    <p>{person?.character}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Credits;
