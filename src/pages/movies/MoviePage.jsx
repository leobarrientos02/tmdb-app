import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewSection from "../../components/Reviews/ReviewSection";
import VotePercentage, { FormatDate } from "../../shared";
import { motion } from "framer-motion";
import "../../styles/moviePage.scss";
import ProductionCompanies from "../../components/ProductionCompanies/ProductionCompanies";
import SimilarContent from "../../components/SimilarContent/SimilarContent";
import ContentImages from "../../components/ContentImages/ContentImages";

const MoviePage = () => {
  const [movieData, setMovieData] = useState([]);
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getMovieData = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movie = await data.json();
    setMovieData(movie);
  };

  useEffect(() => {
    getMovieData(params.id);
  });
  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: "-150%" }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="moviePage"
    >
      <h2>{movieData?.title}</h2>
      <p>Released Date: {FormatDate(movieData?.release_date)}</p>
      <p>Runtime: {movieData?.runtime} minutes</p>
      <p>Average Vote: {VotePercentage(movieData?.vote_average)}%</p>
      <p className="released-icon">{movieData?.status}</p>

      <div className="genres-section">
        {movieData?.genres?.map((genre) => {
          return (
            <Link
              key={genre.id}
              to={`/movie/genre/${genre.id}`}
              className="genre"
            >
              {genre.name}
            </Link>
          );
        })}
      </div>

      <img
        src={
          movieData?.backdrop_path === null
            ? imagePath + movieData?.poster_path
            : imagePath + movieData?.backdrop_path
        }
        alt={movieData?.title}
      />

      <div>
        <h2 className="section-title">Overview</h2>
        <p>{movieData?.overview}</p>
      </div>

      <ContentImages url={`movie/${params.id}/images`} />

      <ProductionCompanies res={movieData} type={"movie"} />

      <ReviewSection id={params.id} type={"movie"} />

      <SimilarContent id={params.id} type={"movie"} />
    </motion.div>
  );
};

export default MoviePage;
