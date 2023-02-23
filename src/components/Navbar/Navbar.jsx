import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../../images/tmdb_short.svg";
import "./navbar.scss";
import { motion } from "framer-motion";

const Navbar = () => {
  // const [genres, setGenres] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // const getGenres = async () => {
  //   const data = await fetch(
  //     `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
  //   );
  //   const res = await data.json();
  //   setGenres(res.genres);
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    setInput("");
  };

  const handleMouseEnter = (id) => {
    let dropdown = document.getElementById(id);
    dropdown.style.display = "flex";
  };

  const handleMouseLeave = (id) => {
    let dropdown = document.getElementById(id);
    dropdown.style.display = "none";
  };

  // useEffect(() => {
  //   getGenres();
  // });
  return (
    <div className="navbar">
      <div className="top-nav">
        <div className="left-nav">
          <Link to="/">
            <motion.img
              src={Logo}
              alt="TMDB"
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            />
          </Link>
          <div className="dropdowns">
            <div
              className="movies-dropdown"
              onMouseEnter={() => handleMouseEnter("movie-links")}
              onMouseLeave={() => handleMouseLeave("movie-links")}
            >
              <h2>Movies</h2>
              <div className="links" id="movie-links">
                <Link to="/movies/popular" className="link">
                  Popular
                </Link>
                <Link to="/movies/now_playing" className="link">
                  Now Playing
                </Link>
                <Link to="/movies/upcoming" className="link">
                  Upcoming
                </Link>
                <Link to="/movies/top_rated" className="link">
                  Top Rated
                </Link>
              </div>
            </div>
            <div
              className="tv-dropdown"
              onMouseEnter={() => handleMouseEnter("tv-links")}
              onMouseLeave={() => handleMouseLeave("tv-links")}
            >
              <h2>TV Shows</h2>
              <div className="links" id="tv-links">
                <Link to="/tvs/popular" className="link">
                  Popular
                </Link>
                <Link to="/tvs/airing_today" className="link">
                  Airing Today
                </Link>
                <Link to="/tvs/on_the_air" className="link">
                  On TV
                </Link>
                <Link to="/tvs/top_rated" className="link">
                  Top Rated
                </Link>
              </div>
            </div>
            <div
              className="people-dropdown"
              onMouseEnter={() => handleMouseEnter("people-links")}
              onMouseLeave={() => handleMouseLeave("people-links")}
            >
              <h2>People</h2>
              <div className="links" id="people-links">
                <Link to="/persons/popular" className="link">
                  Popular People
                </Link>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submitHandler} className="search">
          <input
            type="text"
            required
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Search Movies, TV Shows, or People"
          />
          <button>Search</button>
        </form>
      </div>
      {/* <ul>
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
      </ul> */}
    </div>
  );
};

export default Navbar;
