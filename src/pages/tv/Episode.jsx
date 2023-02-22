import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Episode = () => {
  const [episode, setEpisode] = useState({});
  let params = useParams();
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getEpisode = async (id, seasonNumber, episodeNumber) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setEpisode(res);
  };
  useEffect(() => {
    getEpisode(params.id);
  });

  return (
    <div className="EpisodePage">
      <h2 className="page-title">Episode</h2>
      <img src={imagePath} alt="" />
    </div>
  );
};
export default Episode;
