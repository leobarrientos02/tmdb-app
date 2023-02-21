import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import VotePercentage, { FormatDate } from "../../shared";
import "./Carousel.scss";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";

const Carousel = ({ movies }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <Splide
      options={{
        perPage: 4,
        drag: "free",
        gap: "2rem",
        arrows: true,
        pagination: false,
      }}
    >
      {movies.map((movie) => {
        return (
          <SplideSlide key={movie?.id}>
            <motion.div
              className="movieCard"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="vote-bubble"
                title={VotePercentage(movie?.vote) + "% Rating"}
              >
                {VotePercentage(movie?.vote_average)}%
              </p>
              <Link to={`/movie/${movie?.id}`}>
                <img
                  src={imagePath + movie?.poster_path}
                  alt=""
                  onError={(e) => (e.currentTarget.src = NotFound)}
                />
              </Link>
              <h2 className="movie-title">{movie?.title}</h2>
              <p className="release">
                Release date: {FormatDate(movie?.release_date)}
              </p>
            </motion.div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default Carousel;
