import { Banner } from "../components/Banner";
import GenrePreview from "../components/GenrePreview";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
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
      {genres.map((genre) => {
        return (
          <GenrePreview
            key={genre?.id}
            name={genre?.name}
            genreId={genre?.id}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
