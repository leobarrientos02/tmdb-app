import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Show from "../Show/Show";
import Movie from "../Movie/Movie";
import "./similarContent.scss";

const SimilarContent = ({ id, media_type, language }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    setData(res.results);
  };

  useEffect(() => {
    getData();
  });

  if (data.length > 0) {
    return (
      <div className="SimilarContent">
        <h2 className="title">
          Similar {media_type === "tv" ? "Shows" : "Movies"}
        </h2>
        <Splide
          options={{
            perPage: 5,
            drag: "free",
            gap: "2rem",
            arrows: false,
            pagination: true,
          }}
        >
          {data.map((content) => {
            return (
              <SplideSlide key={content?.id} className="similar-card-wrapper">
                <Link
                  to={`/${media_type === "tv" ? "tv" : media_type}/${
                    content?.id
                  }`}
                  className="link"
                >
                  {media_type === "tv" ? (
                    <Show
                      id={content?.id}
                      name={content?.name}
                      poster_path={content?.poster_path}
                      aired_date={content?.first_air_date}
                      vote={content?.vote_average}
                    />
                  ) : (
                    <Movie
                      id={content?.id}
                      title={content?.name}
                      poster_path={content?.poster_path}
                      release_date={content?.release_date}
                      vote={content?.vote_average}
                    />
                  )}
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
export default SimilarContent;
