import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../../images/tmdb_short.svg";
import "./navbar.scss";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
// import { AiOutlineSearch } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import { checkType, handleMouseEnter, handleMouseLeave } from "../../shared";

const Navbar = ({ setLanguage, language }) => {
  const [input, setInput] = useState("");
  const [type, setType] = useState("movie");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${type}/${input}`);
    setInput("");
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
          <div className="languages">
            <GrLanguage size="2em" />
            {language}
            <button onClick={() => setLanguage("ar")}>Arabic</button>
            <button onClick={() => setLanguage("bg")}>Bulgarian</button>
            <button onClick={() => setLanguage("zh")}>Chinese</button>
            <button onClick={() => setLanguage("cs")}>Czech</button>
            <button onClick={() => setLanguage("da")}>Danish</button>
            <button onClick={() => setLanguage("nl")}>Dutch</button>
            <button onClick={() => setLanguage("en")}>English</button>
            <button onClick={() => setLanguage("fr")}>French</button>
            <button onClick={() => setLanguage("de")}>German</button>
            <button onClick={() => setLanguage("el")}>Greek</button>
            <button onClick={() => setLanguage("he")}>Hebrew</button>
            <button onClick={() => setLanguage("hu")}>Hungarian</button>
            <button onClick={() => setLanguage("id")}>Indonesian</button>
            <button onClick={() => setLanguage("it")}>Italian</button>
            <button onClick={() => setLanguage("ja")}>Japanese</button>
            <button onClick={() => setLanguage("ko")}>Korean</button>
            <button onClick={() => setLanguage("pl")}>Polish</button>
            <button onClick={() => setLanguage("pt")}>Portuguese</button>
            <button onClick={() => setLanguage("ro")}>Romanian</button>
            <button onClick={() => setLanguage("ru")}>Russian</button>
            <button onClick={() => setLanguage("sr")}>Serbian</button>
            <button onClick={() => setLanguage("es")}>Spanish</button>
            <button onClick={() => setLanguage("sv")}>Swedish</button>
            <button onClick={() => setLanguage("tr")}>Turkish</button>
            <button onClick={() => setLanguage("uk")}>Ukranian</button>
            <button onClick={() => setLanguage("vi")}>Vietnamese</button>
          </div>
        </div>
      </div>

      <div className="bottom-nav">
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
    </div>
  );
};

export default Navbar;
