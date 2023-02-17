import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

const CompanyPage = () => {
  const [movies, setMovies] = useState([]);
  let params = useParams();
  let companyId = params.id;

  const getMovies = async (category) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_companies=${companyId}&page=1&api_key=${process.env.API_KEY}`
    );
    const movies = await data.json();
    setMovies(movies.results);
  };
  useEffect(() => {
    getMovies(params.id);
  });
  return (
    <div>
      <h4>Company</h4>
    </div>
  );
};

export default CompanyPage;
