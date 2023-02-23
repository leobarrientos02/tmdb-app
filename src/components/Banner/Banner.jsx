import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { checkType, handleMouseEnter, handleMouseLeave } from "../../shared";
import { FiChevronDown } from "react-icons/fi";
import "./banner.scss";

export function Banner() {
  const [input, setInput] = useState("");
  const [type, setType] = useState("movie");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${type}/${input}`);
    setInput("");
  };
  return (
    <motion.div
      className="banner"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="banner-title">
        <h2 className="text-5xl font-semibold">Welcome.</h2>
        <h3 className="text-3xl font-semibold">
          Explore our large variety of movies.
        </h3>
      </div>
      <form onSubmit={submitHandler} className="search">
        <div
          className="search-type-wrapper"
          onMouseEnter={() =>
            handleMouseEnter("banner-search-options", "search-banner-arrow")
          }
          onMouseLeave={() =>
            handleMouseLeave("banner-search-options", "search-banner-arrow")
          }
        >
          <div className="search-type">
            <p>{checkType(type)}</p>
            <FiChevronDown
              size="1.2em"
              id="search-banner-arrow"
              className="arrow"
            />
          </div>
          <div className="search-types" id="banner-search-options">
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
          className="search-input"
          type="text"
          required
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder={`Search for ${checkType(type)}`}
        />
        <input className="search-btn" type="submit" value="Search" />
      </form>
    </motion.div>
  );
}
