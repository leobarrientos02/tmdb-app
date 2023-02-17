import { Link } from "react-router-dom";

function VotePercentage(num) {
  return Math.round((num * 100) / 10);
}
const Movie = ({ id, vote, poster_path, title, release_date }) => {
  return (
    <div>
      <p className="vote-bubble" title={VotePercentage(vote) + "% Rating"}>
        {VotePercentage(vote)}%
      </p>
      <Link href={`movie/${id}`}>
        <p>{poster_path}</p>
      </Link>
      <h1 className="text-lg font-bold mt-2">{title}</h1>
      <p className="text-xs text-gray-300">Release date: {release_date}</p>
    </div>
  );
};

export default Movie;
