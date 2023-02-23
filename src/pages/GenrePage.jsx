import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import Pagination from "../components/Pagination/Pagination";
// import { scrollToTop } from "../shared";

const GenrePage = () => {
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getData = async (genre, pageNum, type) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&page=${pageNum}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await data.json();
    setPage(pageNum);
    setTotal(movies.total_pages > 500 ? 500 : movies.total_pages);
    setData(movies.results);
  };

  const getGenreName = async (id, type) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    var result = res.genres.filter(function (obj) {
      return obj.id === Number(id);
    })[0];
    setGenre(result.name);
  };

  const pagination = (id, page) => {
    // scrollToTop();
    getData(id, page, params.type);
  };

  useEffect(() => {
    getData(params.id, page, params.type);
    getGenreName(params.id, params.type);
  }, [page, params.id, params.type]);
  return (
    <div className="GenrePage">
      <h2 className="page-title">
        {genre} {params.type === "tv" ? "Shows" : "Movies"}
      </h2>
      <div className="page-grid">
        {data.map((content) => {
          return (
            <Card
              key={content.id}
              id={content.id}
              title={params.type === "movie" ? content.title : content.name}
              poster_path={content.poster_path}
              release_date={
                params.type === "movie"
                  ? content.release_date
                  : content.first_air_date
              }
              vote={content.vote_average}
              type={params.type}
            />
          );
        })}
      </div>

      <Pagination
        param={params.id}
        page={page}
        total={total}
        pagination={pagination}
        type={"genre"}
      />
    </div>
  );
};

export default GenrePage;
