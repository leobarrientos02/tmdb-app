import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import VotePercentage, { FormatDate } from "../../shared";
import "./similarContent.scss";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";

const SimilarContent = ({ id, type }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setData(res.results);
  };

  let imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    getData();
  });
  return (
    <div className="SimilarContent">
      <h2 className="title">Similar {type === "tv" ? "Shows" : type}</h2>
      <Splide
        options={{
          perPage: 5,
          drag: "free",
          gap: "2rem",
          arrows: true,
          pagination: false,
        }}
      >
        {data.map((content) => {
          return (
            <SplideSlide key={content?.id}>
              <Link
                to={`/${type === "tv" ? "show" : type}/${content?.id}`}
                className="card"
              >
                <motion.img
                  src={imagePath + content?.poster_path}
                  alt=""
                  onError={(e) => (e.currentTarget.src = NotFound)}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
                <h2 className="content-title">{content?.name}</h2>
                <p className="date">
                  {type === "tv"
                    ? FormatDate(content?.first_air_date)
                    : FormatDate(content?.release_date)}
                </p>
                <p
                  className="vote-bubble2"
                  title={VotePercentage(content?.vote_average) + "% Rating"}
                >
                  {VotePercentage(content?.vote_average)}%
                </p>
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
export default SimilarContent;
