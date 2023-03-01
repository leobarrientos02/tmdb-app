import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import Show from "../../../components/Show/Show";
import Sort from "../../../components/Sort/Sort";
import { FormatTitle } from "../../../shared";

const Shows = ({ language }) => {
  let params = useParams();
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let sort =
    params.filter === "top_rated" ? "vote_average.desc" : "popularity.desc";
  const [sortBy, setSortBy] = useState(sort);

  const getPath = (param) => {
    if (param === "popular") {
      return `sort_by=${sortBy}&`;
    } else if (param === "upcoming") {
      let today = new Date();
      let future = new Date().setMonth(today.getMonth() + 1);
      return `first_air_date.gte=${today.toISOString()}&first_air_date.lte=${future}&sort_by=${sortBy}&`;
    } else if (param === "on_the_air") {
      let today = new Date();
      let past = new Date().setMonth(today.getMonth() - 1);
      return `first_air_date.gte=${past}&first_air_date.lte=${today.toISOString()}&sort_by=${sortBy}&`;
    } else if (param === "top_rated") {
      return `vote_count.gte=1500&vote_average.gte=7&sort_by=${sortBy}&`;
    }
  };
  const getShows = async () => {
    let path = getPath(params.filter);
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/tv?sort_by=${sortBy}&${path}page=${page}&language=${language}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setTotal(res.total_pages > 500 ? 500 : res.total_pages);
    setShows(res.results);
  };

  const pagination = (page) => {
    setPage(page);
  };

  const getOptionValue = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    getShows();
  });
  return (
    <div className="AllMovies">
      <div className="page-title">
        <h2>{FormatTitle(params.filter)} Shows</h2>
        <Sort getOptionValue={getOptionValue} />
      </div>

      <div className="page-grid">
        {shows.map((show) => {
          return (
            <Show
              key={show.id}
              id={show.id}
              name={show.name}
              poster_path={show.poster_path}
              aired_date={show.first_air_date}
              vote={show.vote_average}
            />
          );
        })}
      </div>

      <Pagination
        param={params.filter}
        page={page}
        total={total}
        pagination={pagination}
      />
    </div>
  );
};
export default Shows;
