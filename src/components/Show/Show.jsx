import { Link } from "react-router-dom";
import "./show.scss";
import VotePercentage, {
  FormatDate,
  NullEmptyUndefinedChecker,
  getBackgroundColor,
  getBackgroundImage,
} from "../../shared";
import { motion } from "framer-motion";
import ContentNotFound from "../NotFound/ContentNotFound";

const Show = ({ id, vote, poster_path, name, character, aired_date }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <motion.div
      className="show"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="vote-bubble">
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
      </div>
      <Link to={`/tv/${id}`} className="link">
        {NullEmptyUndefinedChecker(poster_path) === false ? (
          <ContentNotFound content={"Show"} />
        ) : (
          <img src={imagePath + poster_path} alt={name} />
        )}
      </Link>
      <h2 className="show-name">{name}</h2>
      <p className="character">{character}</p>
      <p className="show-date">First Aired Date: {FormatDate(aired_date)}</p>
    </motion.div>
  );
};

export default Show;
