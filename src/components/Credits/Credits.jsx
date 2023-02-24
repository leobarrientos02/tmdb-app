import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotFound from "../../images/imageNotFound.png";
import "./credits.scss";

const Credits = ({ type, id }) => {
  const [credits, setCredits] = useState([]);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getCredits = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setCredits(res.cast);
  };

  useEffect(() => {
    getCredits();
  });
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
                <img
                  src={imagePath + person?.profile_path}
                  alt=""
                  onError={(e) => (e.currentTarget.src = NotFound)}
                />
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
};

export default Credits;
