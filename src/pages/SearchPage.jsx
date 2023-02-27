import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "../images/imageNotFound.png";
import Pagination from "../components/Pagination/Pagination";
import "../styles/searchPage.scss";
import Show from "../components/Show/Show";
import Movie from "../components/Movie/Movie";

const SearchPage = ({ language }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let imagePath = "https://image.tmdb.org/t/p/original";
  let params = useParams();

  const getData = async (search) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}search/${params.media}?api_key=${process.env.REACT_APP_API_KEY}&query=${search}&page=${page}&language=${language}`
    );
    const res = await data.json();
    setTotal(res.total_pages);
    setData(res.results);
  };

  const pagination = (pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    getData(params.search);
  });

  if (params.media === "tv" || params.media === "movie") {
    return (
      <div className="SearchPage">
        <h2 className="page-title">Results for search: {params.search}</h2>

        {params.media === "tv" ? (
          <div className="page-grid">
            {data.map((content) => {
              return (
                <Show
                  key={content.id}
                  id={content.id}
                  name={content.name}
                  poster_path={content.poster_path}
                  aired_date={content.first_air_date}
                  vote={content.vote_average}
                />
              );
            })}
          </div>
        ) : (
          <div className="page-grid">
            {data.map((content) => {
              return (
                <Movie
                  key={content.id}
                  id={content.id}
                  title={content.title}
                  poster_path={content.poster_path}
                  release_date={content.release_date}
                  vote={content.vote_average}
                  type={params.media}
                />
              );
            })}
          </div>
        )}

        <Pagination
          param={params.search}
          page={page}
          total={total}
          pagination={pagination}
          type="OneParameter"
        />
      </div>
    );
  } else if (params.media === "company") {
    return (
      <div className="SearchPage">
        <h2 className="page-title">Results for search: {params.search}</h2>

        {params.media === "tv" ? (
          <div className="page-grid">
            {data.map((content) => {
              return (
                <Show
                  key={content.id}
                  id={content.id}
                  name={content.name}
                  poster_path={content.poster_path}
                  aired_date={content.first_air_date}
                  vote={content.vote_average}
                />
              );
            })}
          </div>
        ) : (
          <div className="page-grid">
            {data.map((content) => {
              return (
                <Movie
                  key={content.id}
                  id={content.id}
                  title={content.title}
                  poster_path={content.poster_path}
                  release_date={content.release_date}
                  vote={content.vote_average}
                  type={params.media}
                />
              );
            })}
          </div>
        )}

        <Pagination
          param={params.search}
          page={page}
          total={total}
          pagination={pagination}
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
