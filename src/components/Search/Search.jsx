import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { checkType, handleMouseEnter, handleMouseLeave } from "../../shared";
import { FiChevronDown } from "react-icons/fi";
import "./search.scss";

const Search = ({ location }) => {
  const [input, setInput] = useState("");
  const [type, setType] = useState("movie");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${type}/${input}`);
    setInput("");
  };
  return (
    <form
      onSubmit={submitHandler}
      className={location === "nav" ? "nav-search" : "banner-search"}
    >
      <div
        className="search-type-wrapper"
        onMouseEnter={() =>
          handleMouseEnter("search-options", "search-type-arrow")
        }
        onMouseLeave={() =>
          handleMouseLeave("search-options", "search-type-arrow")
        }
      >
        <div className="search-type-icon">
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
        className="nav-input"
      />
      <button className="nav-search-btn">Search</button>
    </form>
  );
};
export default Search;
