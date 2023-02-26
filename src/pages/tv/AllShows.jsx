import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Card from "../../components/Card/Card";
import { FiChevronRight } from "react-icons/fi";
import "../../styles/AllShows.scss";

const AllShows = ({ language }) => {
  const [shows, setShows] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [showSort, setShowSort] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getShows = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}discover/tv/?api_key=${process.env.REACT_APP_API_KEY}&sort_by=${sortBy}&page=${page}&language=${language}`
    );
    const shows = await data.json();
    setTotal(shows.total_pages > 500 ? 500 : shows.total_pages);
    setShows(shows.results);
  };

  const pagination = (num) => {
    setPage(num);
  };

  const getSortValue = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    getShows();
  });
  return (
    <div className="AllShows">
      <div className="title">
        <h2>All Shows</h2>
      </div>

      <div className="sort-filter-shows-wrapper">
        <div className="sort-filter">
          <div className="sort">
            <div className="sort-btn" onClick={() => setShowSort(!showSort)}>
              <h2>Sort</h2>
              <FiChevronRight
                size="1.2em"
                className={showSort === true ? "rotateArrow" : ""}
              />
            </div>
            <div className={showSort === false ? "hide" : "show"}>
              <p>Sort shows by</p>
              <select onChange={getSortValue}>
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="release_date.desc">
                  Release Date Descending
                </option>
                <option value="release_date.asc">Release Date Ascending</option>
                <option value="original_title.asc">Title (A-Z)</option>
                <option value="original_title.desc">Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="shows-wrapper">
          <div className="shows">
            {shows.map((show) => {
              return (
                <Card
                  key={show.id}
                  id={show.id}
                  title={show.title}
                  poster_path={show.poster_path}
                  release_date={show.release_date}
                  vote={show.vote_average}
                  type={"tv"}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Pagination
        param={""}
        page={page}
        total={total}
        pagination={pagination}
      />
    </div>
  );
};
export default AllShows;
