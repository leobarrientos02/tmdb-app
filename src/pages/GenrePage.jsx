import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import Pagination from "../components/Pagination/Pagination";

const GenrePage = ({ language }) => {
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let params = useParams();

  const getData = async (genre_id, page_num, media_type) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}discover/${media_type}?with_genres=${genre_id}&page=${page_num}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const movies = await data.json();
    setPage(page_num);
    setTotal(movies.total_pages > 500 ? 500 : movies.total_pages);
    setData(movies.results);
  };

  const getGenreName = async (id, type) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const res = await data.json();
    var result = res.genres.filter(function (obj) {
      return obj.id === Number(id);
    })[0];
    setGenre(result.name);
  };

  const pagination = (id, page) => {
    getData(id, page, params.media);
  };

  useEffect(() => {
    getData(params.id, page, params.type);
    getGenreName(params.id, params.type);
  }, [page, params.id, params.type]);
  return (
    <div className="GenrePage">
      <h2 className="page-title">
        {genre} {params.media === "tv" ? "Shows" : "Movies"}
      </h2>
      <div className="page-grid">
        {data.map((content) => {
          return (
            <Card
              key={content.id}
              id={content.id}
              title={params.media === "movie" ? content.title : content.name}
              poster_path={content.poster_path}
              release_date={
                params.media === "movie"
                  ? content.release_date
                  : content.first_air_date
              }
              vote={content.vote_average}
              type={params.media}
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
