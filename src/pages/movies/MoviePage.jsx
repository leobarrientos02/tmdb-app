import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewSection from "../../components/Reviews/ReviewSection";
import MovieCarousel from "../../components/Carousel/Carousel";
import VotePercentage, { FormatDate } from "../../shared";
import { motion } from "framer-motion";
import "../../styles/moviePage.scss";

const MoviePage = () => {
  const [movieData, setMovieData] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getMovieData = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movie = await data.json();
    setMovieData(movie);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setSimilarMovies(res.results);
  };
  useEffect(() => {
    getMovieData(params.id);
    getSimilarMovies(params.id);
  });
  return (
    <div className="moviePage">
      <h2>{movieData?.title}</h2>
      <p>Released Date: {FormatDate(movieData?.release_date)}</p>
      <p>Runtime: {movieData?.runtime} minutes</p>
      <p>Rating: {VotePercentage(movieData?.vote_average)}%</p>
      <p className="released-icon">{movieData?.status}</p>

      <div className="genres-section">
        {movieData?.genres?.map((genre) => {
          return (
            <Link
              key={genre.id}
              to={`/movies/genre/${genre.id}`}
              className="genre"
            >
              {genre.name}
            </Link>
          );
        })}
      </div>

      <motion.img
        src={imagePath + movieData?.backdrop_path}
        alt={movieData?.title}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <div>
        <h2 className="section-title">Overview</h2>
        <p>{movieData?.overview}</p>
      </div>

      <div className="movie-production">
        <h2>Production Companies</h2>
        <div className="companies">
          {movieData?.production_companies?.map((company) => {
            return (
              <Link
                to={`/movie/company/${company.id}`}
                className="company"
                key={company.id}
              >
                <img src={imagePath + company.logo_path} alt={company.name} />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="movie-reviews">
        <ReviewSection movieId={params.id} />
      </div>

      <div>
        <h2 className="section-title">Similar Movies</h2>
        <MovieCarousel movies={similarMovies} />
      </div>
    </div>
  );
};

export default MoviePage;
