import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import "./SortFilter.scss";

const SortFilter = ({ getSortValue }) => {
  const [showSort, setShowSort] = useState(false);
  return (
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
          <p>Sort movies by</p>
          <select onChange={getSortValue}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
            <option value="original_title.asc">Title (A-Z)</option>
            <option value="original_title.desc">Title (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default SortFilter;
