import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "../images/imageNotFound.png";
import Card from "../components/Card/Card";
import Pagination from "../components/Pagination/Pagination";
import "../styles/searchPage.scss";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let imagePath = "https://image.tmdb.org/t/p/original";
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

  if (params.type === "tv" || params.type === "movie") {
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
  } else if (params.type === "company") {
    return (
      <div className="SearchPage">
        <h2 className="page-title">Results for search: {params.search}</h2>
        <div className="page-grid">
          {data.map((company) => {
            return (
              <Link
                to={`/company/${company.id}`}
                key={company.id}
                className="link"
              >
                <div className="company">
                  <img
                    src={imagePath + company?.logo_path}
                    alt=""
                    onError={(e) => (e.currentTarget.src = NotFound)}
                  />
                  <h2>{company?.name}</h2>
                </div>
              </Link>
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
  } else {
    return (
      <div className="SearchPage">
        <h2 className="page-title">Results for search: {params.search}</h2>
        <div className="page-grid">
          {data.map((person) => {
            return (
              <Link
                to={`/person/${person.id}`}
                key={person.id}
                className="link"
              >
                <div className="person">
                  <img
                    src={imagePath + person?.profile_path}
                    alt=""
                    onError={(e) => (e.currentTarget.src = NotFound)}
                  />
                  <h2>{person?.name}</h2>
                  <p>{person?.known_for_department}</p>
                </div>
              </Link>
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
  }
};
export default SearchPage;
