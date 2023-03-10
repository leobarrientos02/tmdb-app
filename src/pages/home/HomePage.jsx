import { Banner } from "../../components/Banner/Banner";
import GenrePreview from "../../components/GenrePreview/GenrePreview";
import React, { useEffect, useState } from "react";
import "./homePage.scss";

const HomePage = ({ language }) => {
  const [genres, setGenres] = useState([]);
  const [mediaType, setMediaType] = useState("movie");

  const getGenres = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    setGenres(res.genres);
  };

  useEffect(() => {
    getGenres();
  });

  return (
    <div className="homepage">
      <Banner />

      <div className="toggle_media">
        <h2
          onClick={() => setMediaType("movie")}
          className={mediaType === "movie" ? "movie-active" : "movie"}
        >
          Movies
        </h2>
        <h2
          onClick={() => setMediaType("tv")}
          className={mediaType === "tv" ? "tv-active" : "tv"}
        >
          Shows
        </h2>
      </div>
      {genres.map((genre) => {
        return (
          <GenrePreview
            key={genre?.id}
            genre={genre?.name}
            genre_id={genre?.id}
            media_type={mediaType}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
