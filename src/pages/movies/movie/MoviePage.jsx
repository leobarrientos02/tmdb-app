import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReviewSection from "../../../components/Reviews/ReviewSection";
import { FormatDate, NullEmptyUndefinedChecker } from "../../../shared";
import { motion } from "framer-motion";
import "./moviePage.scss";
import ProductionCompanies from "../../../components/ProductionCompanies/ProductionCompanies";
import Credits from "../../../components/Credits/Credits";
import Reccomended from "../../../components/Recommended/Reccomended";
import Media from "../../../components/Media/Media";
import VoteBubble from "../../../components/VoteBubble/VoteBubble";

const MoviePage = ({ language }) => {
  const [movieData, setMovieData] = useState([]);
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getMovieData = async (movie_id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
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
      <VoteBubble vote={movieData?.vote_average} />
      {/* <p>Average Vote: {VotePercentage(movieData?.vote_average)}%</p> */}
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

      <div
        className={
          NullEmptyUndefinedChecker(movieData?.overview) === false ? "hide" : ""
        }
      >
        <h2 className="section-title">Overview</h2>
        <p>{movieData?.overview}</p>
      </div>

      <Media id={params.id} mediaType="movie" />

      <ProductionCompanies data={movieData} />

      <ReviewSection api_path={`movie/${params.id}`} language={language} />

      <Credits api_path={`movie/${params.id}`} language={language} />

      <Reccomended id={params.id} media_type={"movie"} language={language} />
    </motion.div>
  );
};

export default MoviePage;
