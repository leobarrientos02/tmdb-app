import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormatTitle } from "../../shared";

const FilteredTVPage = () => {
  const [shows, setShows] = useState([]);
  let params = useParams();

  const getShows = async (filter) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${filter}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setShows(res.results);
  };
  useEffect(() => {
    getShows(params.filter);
  });
  return (
    <div className="FilterPage">
      <h2 className="page-title">{FormatTitle(params.filter)} TV Shows</h2>
      <div className="movie-grid">
        {shows.map((show) => {
          return <p>{show.name}</p>;
        })}
      </div>
    </div>
  );
};

export default FilteredTVPage;
