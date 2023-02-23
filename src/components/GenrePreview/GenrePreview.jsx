import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./genrePreview.scss";
import Carousel from "../Carousel/Carousel";

const GenrePreview = ({ name, genreId, type }) => {
  const [data, setData] = useState([]);

  const getData = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/${type}?with_genres=${id}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setData(res.results);
  };
  useEffect(() => {
    getData(genreId);
  });
  return (
    <div className="genrePreview">
      <div className="genre-heading">
        <h2>
          {name} {type === "movie" ? "Movies" : "Shows"}
        </h2>
        <Link to={`/${type}/genre/${genreId}`} className="link">
          View More
        </Link>
      </div>
      <Carousel data={data} type={type} />
    </div>
  );
};

export default GenrePreview;
