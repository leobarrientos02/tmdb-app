import React, { useState, useEffect } from "react";
import "./personCredits.scss";
import Movie from "../Movie/Movie";
import Show from "../Show/Show";

const PersonCredits = ({ id, language }) => {
  const [credits, setCredits] = useState([]);
  const [mediaType, setMediaType] = useState("movie");

  const getCredits = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${id}/${mediaType}_credits?language=${language}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setCredits(res.cast);
  };

  useEffect(() => {
    getCredits();
  });
  return (
    <div className="credits">
      <div className="filter-credits">
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
      </div>

      {mediaType === "movie" ? (
        <div className="page-grid">
          {credits.map((movie) => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                character={movie.character}
                vote={movie.vote_average}
              />
            );
          })}
        </div>
      ) : (
        <div className="page-grid">
          {credits.map((show) => {
            return (
              <Show
                key={show.id}
                id={show.id}
                name={show.name}
                poster_path={show.poster_path}
                aired_date={show.first_air_date}
                character={show.character}
                vote={show.vote_average}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default PersonCredits;
