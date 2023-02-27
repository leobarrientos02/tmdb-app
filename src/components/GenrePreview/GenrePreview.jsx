import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./genrePreview.scss";
import Carousel from "../Carousel/Carousel";

const GenrePreview = ({ genre, genre_id, media_type }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/${media_type}?with_genres=${genre_id}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const res = await data.json();
    setData(res.results);
  };
  useEffect(() => {
    getData();
  });
  return (
    <motion.div
      className="genrePreview"
      animate={{ x: 0 }}
      initial={{ x: "-150%" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="genre-heading">
        <h2>{genre}</h2>
        <Link to={`/${media_type}/genre/${genre_id}`} className="link">
          View More
        </Link>
      </div>
      <Carousel data={data} type={media_type} />
    </motion.div>
  );
};

export default GenrePreview;
