import { Link } from "react-router-dom";
import MovieList from "./MovieList";

const GenrePreview = ({ name, id }) => {
  return (
    <div className="my-4">
      <div className="genre-title">
        <h2 className="text-xl font-semibold">{name}</h2>
        <Link to={"/genre/2"}>
          <p className="text-sm">View More</p>
        </Link>
      </div>
      <MovieList data={[1, 2, 3]} />
    </div>
  );
};

export default GenrePreview;
