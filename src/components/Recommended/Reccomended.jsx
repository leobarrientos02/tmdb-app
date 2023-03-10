import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import VotePercentage, {
  FormatDate,
  NullEmptyUndefinedChecker,
} from "../../shared";
import "./reccomended.scss";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";
import ContentNotFound from "../NotFound/ContentNotFound";

const Reccomended = ({ id, media_type, language }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    setData(res.results);
  };

  let imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    getData();
  });

  if (data.length > 0) {
    return (
      <div className="reccomended">
        <h2 className="title">
          Reccomended {media_type === "tv" ? "Shows" : "Movies"}
        </h2>
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
              <SplideSlide
                key={content?.id}
                className="reccomended-card-wrapper"
              >
                <Link
                  to={`/${media_type === "tv" ? "tv" : media_type}/${
                    content?.id
                  }`}
                  className="card"
                >
                  {NullEmptyUndefinedChecker(content?.poster_path) === false ? (
                    <ContentNotFound content="Movie" />
                  ) : (
                    <motion.img
                      src={imagePath + content?.poster_path}
                      alt=""
                      onError={(e) => (e.currentTarget.src = NotFound)}
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    />
                  )}
                  <h2 className="content-title">
                    {media_type === "tv" ? content?.name : content?.title}
                  </h2>
                  <p className="date">
                    {media_type === "tv"
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
  } else {
    return <div></div>;
  }
};
export default Reccomended;
