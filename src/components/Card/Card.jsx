import { Link } from "react-router-dom";
import "./card.scss";
import VotePercentage, { FormatDate } from "../../shared";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";

const Card = ({ id, vote, poster_path, title, release_date, type }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <motion.div
      className="card"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <p className="vote-bubble" title={VotePercentage(vote) + "% Rating"}>
        {VotePercentage(vote)}%
      </p>
      <Link to={`/${type}/${id}`}>
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

export default Card;
