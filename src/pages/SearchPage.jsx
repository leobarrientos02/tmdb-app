import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { scrollToTop } from "../shared";
import Card from "../components/Card/Card";
import Pagination from "../components/Pagination/Pagination";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getData = async (type, search) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&query=${search}&page=${page}`
    );
    const res = await data.json();
    setTotal(res.total_pages);
    setData(res.results);
  };

  const pagination = (pageNum) => {
    // scrollToTop();
    setPage(pageNum);
  };

  useEffect(() => {
    getData(params.type, params.search);
  });

  // let pages = Array.from(Array(total), (_, i) => i + 1);
  return (
    <div className="SearchPage">
      <h2 className="page-title">Results for search: {params.search}</h2>
      <div className="page-grid">
        {data.map((content) => {
          return (
            <Card
              key={content?.id}
              id={content?.id}
              title={params.type === "movie" ? content?.title : content?.name}
              poster_path={content?.poster_path}
              release_date={
                params.type === "movie"
                  ? content?.release_date
                  : content?.first_air_date
              }
              vote={content?.vote_average}
              type={params.type}
            />
          );
        })}
      </div>

      <Pagination
        param={params.search}
        page={page}
        total={total}
        pagination={pagination}
        type="OneParameter"
      />
    </div>
  );
};
export default SearchPage;
