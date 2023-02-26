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

  const getData = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}discover/${params.media}?with_genres=${params.id}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const movies = await data.json();
    setTotal(movies.total_pages > 500 ? 500 : movies.total_pages);
    setData(movies.results);
  };

  const getGenreName = async (id) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}genre/${params.media}/list?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    var result = res.genres.filter(function (obj) {
      return obj.id === Number(id);
    })[0];
    setGenre(result.name);
  };

  const pagination = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getData();
    getGenreName(params.id);
  });
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
      />
    </div>
  );
};

export default GenrePage;
