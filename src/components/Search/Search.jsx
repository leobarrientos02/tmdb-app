import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { checkType } from "../../shared";
import "./search.scss";

const Search = ({ location }) => {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState("movie");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${searchType}/${input}`);
    setInput("");
  };

  const getValue = (e) => {
    setSearchType(e.target.value);
  };
  return (
    <form
      onSubmit={submitHandler}
      className={location === "nav" ? "nav-search" : "banner-search"}
    >
      <select onChange={getValue}>
        <option value="movie" className={searchType === "movie" ? "hide" : ""}>
          Movies
        </option>
        <option value="tv" className={searchType === "tv" ? "hide" : ""}>
          Shows
        </option>
        <option
          value="company"
          className={searchType === "company" ? "hide" : ""}
        >
          Companies
        </option>
        <option
          value="person"
          className={searchType === "person" ? "hide" : ""}
        >
          Person
        </option>
      </select>
      <input
        type="text"
        required
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder={`Search for ${checkType(searchType)}`}
        className="nav-input"
      />
      <button className="nav-search-btn">Search</button>
    </form>
  );
};
export default Search;
