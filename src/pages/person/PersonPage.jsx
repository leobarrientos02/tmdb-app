import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Credits from "../../components/Credits/Credits";
import { FormatDate } from "../../shared";
import "../../styles/personPage.scss";

const PersonPage = () => {
  const [person, setPerson] = useState({});
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getPerson = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setPerson(res);
  };
  useEffect(() => {
    getPerson(params.id);
  });
  return (
    <div className="PeoplePage">
      <div className="header">
        <div className="image-wrapper">
          <img src={imagePath + person?.profile_path} alt="" />
        </div>
        <div className="biography">
          <h2>{person?.name}</h2>
          <p>{person?.known_for_department}</p>
          <p>Birthdate: {FormatDate(person?.birthday)}</p>
          <p>Place of Birth: {person?.place_of_birth}</p>
          <p>{person?.biography}</p>
        </div>
      </div>

      <Credits id={params.id} />
    </div>
  );
};
export default PersonPage;
