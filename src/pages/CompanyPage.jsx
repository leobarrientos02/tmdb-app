import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyBanner from "../components/CompanyBanner";
import Movie from "../components/Movie";

const CompanyPage = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();

  const getMovies = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_companies=${id}&page=1&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await data.json();
    setMovies(movies.results);
  };
  useEffect(() => {
    getMovies(params.id);
  });
  return (
    <div>
      <CompanyBanner companyId={params.id} />
      <div className="movie-grid">
        {movies.map((movie) => {
          return (
            <Movie
              key={movie?.id}
              id={movie?.id}
              title={movie?.title}
              poster_path={movie?.poster_path}
              release_date={movie?.release_date}
              vote={movie?.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CompanyPage;
