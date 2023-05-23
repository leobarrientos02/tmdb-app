import { Link } from "react-router-dom";
import VotePercentage, {
  FormatDate,
  NullEmptyUndefinedChecker,
  getBackgroundColor,
  getBackgroundImage,
} from "../../shared";
import { motion } from "framer-motion";
import "./movie.scss";
import ContentNotFound from "../NotFound/ContentNotFound";

const Movie = ({ id, vote, poster_path, title, character, release_date }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <motion.div
      className="movie"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="vote-bubble">
        <div
          className="vote-bubble-outer"
          title={VotePercentage(vote) + "% Rating"}
        >
          <div
            className="border"
            style={{
              backgroundColor: `${getBackgroundColor(VotePercentage(vote))}`,
              backgroundImage: `${getBackgroundImage(VotePercentage(vote))}`,
            }}
          >
            <div className={`vote-bubble-inner`}>
              <p className="vote">{VotePercentage(vote)}</p>
              <p className="percent-sign">%</p>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/movie/${id}`} className="link">
        {NullEmptyUndefinedChecker(poster_path) === false ? (
          <ContentNotFound content={"Movie"} />
        ) : (
          <img src={imagePath + poster_path} alt={title} />
        )}
      </Link>
      <h2 className="movie-title">{title}</h2>
      <p className="character">{character}</p>
      <p className="movie-date">Release date: {FormatDate(release_date)}</p>
    </motion.div>
  );
};

export default Movie;
