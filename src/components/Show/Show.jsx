import { Link } from "react-router-dom";
import "./show.scss";
import VotePercentage, { FormatDate } from "../../shared";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";

const Show = ({ id, vote, poster_path, name, aired_date }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <motion.div
      className="show"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
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
      <h2>{name}</h2>
      <p>First Aired Date: {FormatDate(aired_date)}</p>
    </motion.div>
  );
};

export default Show;
