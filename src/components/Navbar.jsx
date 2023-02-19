import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Logo from "../images/logo.svg";
import "../styles/navbar.scss";

const Navbar = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const getGenres = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setGenres(res.genres);
  };
  useEffect(() => {
    getGenres();
  });
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="TMDB" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/category/popular" className="nav-link">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/category/now_playing" className="nav-link">
            Now Playing
          </Link>
        </li>
        <li>
          <Link to="/category/top_rated" className="nav-link">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/category/upcoming" className="nav-link">
            Upcoming
          </Link>
        </li>
        <select name="genre" className="genre-dropdown">
          <option value="" selected disabled className="genre-option">
            Genres
          </option>
          {genres.map((genre) => {
            return (
              <option
                key={genre.id}
                className="genre-option"
                onClick={() => navigate(`/genre/${genre.id}`)}
              >
                {genre.name}
              </option>
            );
          })}
        </select>
      </ul>
    </div>
  );
};

export default Navbar;
