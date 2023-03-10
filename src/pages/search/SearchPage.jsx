import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import "./searchPage.scss";
import Show from "../../components/Show/Show";
import Movie from "../../components/Movie/Movie";
import { NullEmptyUndefinedChecker } from "../../shared";
import ContentNotFound from "../../components/NotFound/ContentNotFound";

const SearchPage = ({ language }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let imagePath = "https://image.tmdb.org/t/p/original";
  let params = useParams();

  const getData = async (search) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/${params.media}?api_key=${process.env.REACT_APP_API_KEY}&query=${search}&page=${page}&language=${language}`
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
                  character=""
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
                  character=""
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
        <div className="page-grid">
          {data.map((content) => {
            return (
              <Link to={`/company/${content.id}`} className="link">
                <div className="company">
                  {NullEmptyUndefinedChecker(content.logo_path) === false ? (
                    <ContentNotFound content="CompanySearch" />
                  ) : (
                    <img
                      src={imagePath + content.logo_path}
                      alt={content.name}
                    />
                  )}
                  <h2>{content.name}</h2>
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
                  {NullEmptyUndefinedChecker(person.profile_path) === false ? (
                    <ContentNotFound content="Person" />
                  ) : (
                    <img src={imagePath + person?.profile_path} alt="" />
                  )}
                  <h2>{person?.name}</h2>
                  <p>{person?.known_for_department}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <Pagination page={page} total={total} pagination={pagination} />
      </div>
    );
  }
};
export default SearchPage;
