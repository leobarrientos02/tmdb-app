import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Credits from "../../components/Credits/Credits";
import { FormatDate } from "../../shared";
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
      <img src={imagePath + person?.profile_path} alt="" />
      <h2>{person?.name}</h2>
      <p>{FormatDate(person?.birthday)}</p>
      <p>{person?.place_of_birth}</p>
      <p>{person?.known_for_department}</p>
      <p>{person?.biography}</p>

      <Credits id={params.id} />
    </div>
  );
};
export default PersonPage;
