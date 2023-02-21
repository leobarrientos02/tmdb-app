import { Link } from "react-router-dom";
import "./movie.scss";
import VotePercentage, { FormatDate } from "../../shared";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";

const Movie = ({ id, vote, poster_path, title, release_date }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <motion.div
      className="movie"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.07 }}
    >
      <p className="vote-bubble" title={VotePercentage(vote) + "% Rating"}>
        {VotePercentage(vote)}%
      </p>
      <Link to={`/movie/${id}`}>
        <img
          src={imagePath + poster_path}
          alt=""
          onError={(e) => (e.currentTarget.src = NotFound)}
        />
      </Link>
      <h2>{title}</h2>
      <p>Release date: {FormatDate(release_date)}</p>
    </motion.div>
  );
};

export default Movie;
