import "./sort.scss";
const Sort = ({ getOptionValue }) => {
  return (
    <div className="sort">
      <select className="sort-select" onChange={getOptionValue}>
        <option value="popularity.desc">Popularity Descending</option>
        <option value="popularity.asc">Popularity Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
        <option value="vote_average.asc">Rating Ascending</option>
        <option value="release_date.desc">Release Date Descending</option>
        <option value="release_date.asc">Release Date Ascending</option>
        <option value="original_title.desc">Title (Z-A) Descending</option>
        <option value="original_title.asc">Title (A-Z) Ascending</option>
      </select>
    </div>
  );
};
export default Sort;
