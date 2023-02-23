import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Credits from "../../components/Credits/Credits";
import { FormatBirthDate } from "../../shared";
import { motion } from "framer-motion";
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
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: "-150%" }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="PeoplePage"
    >
      <div className="header">
        <div className="image-wrapper">
          <img src={imagePath + person?.profile_path} alt="" />
        </div>
        <div className="biography">
          <h2>{person?.name}</h2>
          <p>{person?.known_for_department}</p>
          <p>
            {person?.birthday === "" || person?.birthday === null
              ? ""
              : "Birthdate: " + FormatBirthDate(person?.birthday)}
          </p>
          <p>
            {person?.deathday === "" || person?.deathday === null
              ? ""
              : "Deathdate: " + FormatBirthDate(person?.deathday)}
          </p>
          <p>
            {person?.place_of_birth === "" || person?.place_of_birth === null
              ? ""
              : `Birthplace: ${person?.place_of_birth}`}
          </p>
          <p>{person?.biography}</p>
        </div>
      </div>

      <Credits id={params.id} />
    </motion.div>
  );
};
export default PersonPage;