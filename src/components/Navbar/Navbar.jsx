import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/tmdb_short.svg";
import { motion } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  handleMouseEnter,
  handleMouseLeave,
  languageObjects,
} from "../../shared";
import "./navbar.scss";
import Search from "../Search/Search";

const Navbar = ({ setLanguage, language }) => {
  const [showSearch, setShowSearch] = useState(false);
  let languages = languageObjects;
  const [showLanguages, setShowLanguages] = useState(false);

  const getLanguageValue = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="navbar">
      <div className="top-nav">
        <div className="top-left-nav">
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
                <Link to="/shows/popular" className="link">
                  Popular
                </Link>
                <Link to="/shows/airing_today" className="link">
                  Airing Today
                </Link>
                <Link to="/shows/on_the_air" className="link">
                  On TV
                </Link>
                <Link to="/shows/top_rated" className="link">
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

        <div className="top-right-nav">
          <div className="languages-wrapper">
            <button onClick={() => setShowLanguages(!showLanguages)}>
              {language}
            </button>
            <div className={showLanguages === false ? "hide" : "show"}>
              <div className="languages">
                <h2>Language Preferences</h2>
                <select onChange={getLanguageValue}>
                  {languages.map((lang) => {
                    return (
                      <option value={lang?.iso} key={lang?.iso}>
                        {lang?.name} ({lang?.iso})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="search-btn-wrapper">
            {showSearch === false ? (
              <AiOutlineSearch
                size="1.2rem"
                onClick={() => setShowSearch(!showSearch)}
              />
            ) : (
              <FiX size="1.2rem" onClick={() => setShowSearch(!showSearch)} />
            )}
          </div>
        </div>
      </div>

      <div className={showSearch === true ? "show" : "hide"}>
        <Search location={"nav"} />
      </div>
    </div>
  );
};

export default Navbar;
