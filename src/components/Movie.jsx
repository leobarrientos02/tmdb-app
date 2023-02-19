import { Link } from "react-router-dom";
import "../styles/movie.scss";
import VotePercentage, { FormatDate } from "../shared";

const Movie = ({ id, vote, poster_path, title, release_date }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <div className="movie">
      <p className="vote-bubble" title={VotePercentage(vote) + "% Rating"}>
        {VotePercentage(vote)}%
      </p>
      <Link to={`/movie/${id}`}>
        <img src={imagePath + poster_path} alt={title} />
      </Link>
      <h2>{title}</h2>
      <p>Release date: {FormatDate(release_date)}</p>
    </div>
  );
};

export default Movie;
