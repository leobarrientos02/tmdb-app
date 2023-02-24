import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotFound from "../../images/imageNotFound.png";
import "./credits.scss";

const Credits = ({ api_path }) => {
  const [credits, setCredits] = useState([]);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getCredits = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}${api_path}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const res = await data.json();
    setCredits(res.cast);
  };

  useEffect(() => {
    getCredits();
  });

  if (credits !== undefined) {
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
                    <img
                      src={imagePath + person?.profile_path}
                      alt=""
                      onError={(e) => (e.currentTarget.src = NotFound)}
                    />
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
