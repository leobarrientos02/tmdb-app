import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../../images/tmdb_short.svg";
import "./navbar.scss";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { checkType, handleMouseEnter, handleMouseLeave } from "../../shared";

const Navbar = () => {
  // const [genres, setGenres] = useState([]);
  const [input, setInput] = useState("");
  const [type, setType] = useState("movie");
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
    navigate(`/search/${type}/${input}`);
    setInput("");
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
              onMouseEnter={() =>
                handleMouseEnter("movie-links", "movie-nav-arrow")
              }
              onMouseLeave={() =>
                handleMouseLeave("movie-links", "movie-nav-arrow")
              }
            >
              <h2>
                Movies
                <FiChevronDown
                  size="1.2em"
                  id="movie-nav-arrow"
                  className="arrow"
                />
              </h2>
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
              onMouseEnter={() => handleMouseEnter("tv-links", "tv-nav-arrow")}
              onMouseLeave={() => handleMouseLeave("tv-links", "tv-nav-arrow")}
            >
              <h2>
                TV Shows
                <FiChevronDown
                  size="1.2em"
                  id="tv-nav-arrow"
                  className="arrow"
                />
              </h2>
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
              onMouseEnter={() =>
                handleMouseEnter("people-links", "people-nav-arrow")
              }
              onMouseLeave={() =>
                handleMouseLeave("people-links", "people-nav-arrow")
              }
            >
              <h2>
                People
                <FiChevronDown
                  size="1.2em"
                  id="people-nav-arrow"
                  className="arrow"
                />
              </h2>
              <div className="links" id="people-links">
                <Link to="/persons/popular" className="link">
                  Popular People
                </Link>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submitHandler} className="search">
          <div
            className="search-type-wrapper"
            onMouseEnter={() =>
              handleMouseEnter("search-options", "search-type-arrow")
            }
            onMouseLeave={() =>
              handleMouseLeave("search-options", "search-type-arrow")
            }
          >
            <div className="search-type">
              <p>{checkType(type)}</p>
              <FiChevronDown
                size="1.2em"
                id="search-type-arrow"
                className="arrow"
              />
            </div>
            <div className="search-types" id="search-options">
              <p
                onClick={() => setType("movie")}
                className={type === "movie" ? "hide" : ""}
              >
                Movies
              </p>
              <p
                onClick={() => setType("tv")}
                className={type === "tv" ? "hide" : ""}
              >
                Shows
              </p>
              <p
                onClick={() => setType("company")}
                className={type === "company" ? "hide" : ""}
              >
                Company
              </p>
              <p
                onClick={() => setType("person")}
                className={type === "person" ? "hide" : ""}
              >
                Person
              </p>
            </div>
          </div>
          <input
            type="text"
            required
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder={`Search for ${checkType(type)}`}
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
